from flask import Flask, render_template, redirect, session, request, jsonify
from authlib.integrations.requests_client import OAuth2Session
from operator import itemgetter
import os
import secrets
import crud
import data_processing
import api_calls
from model import connect_to_db, db
from datetime import date
import sys
import string
import utils


app = Flask(__name__)
app.app_context().push()
app.secret_key = secrets.token_hex(16)


@app.route('/')
def render_landing_page():
    return render_template('homepage.html')


@app.route('/login')
def oauth_login():
    scopes = ['user-top-read', 'user-read-private', 'playlist-modify-private']
    scopes = ' '.join(scopes)
    redirect_uri = 'http://localhost:5000/callback'
    client = OAuth2Session(os.environ.get('CLIENT_ID'),
                           os.environ.get('CLIENT_SECRET'),
                           scope = scopes, redirect_uri = redirect_uri)
    authorization_endpoint = 'https://accounts.spotify.com/authorize'
    uri, state = client.create_authorization_url(authorization_endpoint)
    session['state'] = state

    return redirect(uri)


@app.route('/callback')
def return_auth_code():
    code = request.args.get('code')
    state = request.args.get('state')
    uri = 'http://localhost:5000/callback'

    if state != session['state']:
        return 'Unauthorized', 403

    response = api_calls.get_auth_code(code, uri)

    try:
        response.raise_for_status()
    except Exception:
        return 'Unauthorized', 403

    authorization = response.json()

    data_processing.process_auth_codes(authorization)

    return 'Success', 200


@app.route('/user-info')
def return_user_info():

    utils.check_refresh_state()

    user_profile = api_calls.make_user_call(session['access_token'])

    db_user = crud.get_user(user_profile.get('id')).first() \
        or data_processing.process_user_response(user_profile)
        
    session['user_id'] = db_user.spotify_id

    user_info = {
        'display_name': db_user.display_name,
        'img_url': db_user.img_url,
        'login_state': session.get('login_state', False),
    }

    return jsonify(user_info)


@app.route('/login-check')
def check_login():
    """Return session login info, if any."""

    login_state = session.get('login_state', False)

    return jsonify(login_state)


@app.route('/wrap-history')
def gather_wrap_data():

    timeframe = request.args.get('timeframe')

    utils.check_refresh_state()

    user_top_artists = api_calls.make_artist_call(token = session['access_token'],
                                                  timeframe = timeframe)
    
    data_processing.process_artist_response(response = user_top_artists,
                                            user_id = session['user_id'],
                                            timeframe = timeframe)
    
    user_top_tracks = api_calls.make_track_call(token = session ['access_token'],
                                                timeframe = timeframe)
    
    data_processing.process_track_response(response = user_top_tracks,
                                           user_id= session['user_id'],
                                           timeframe= timeframe)
    
    return 'Success', 200


@app.route('/top-tracks')
def return_top_tracks():
    timeframe = request.args.get('timeframe')
    tracks_list = []
    top_tracks = crud.get_user_tracks(session['user_id'], timeframe).all()
    
    if not top_tracks:
        tracks_list.append(None)
        return jsonify(tracks_list)

    for track in top_tracks:
        track_dict = data_processing.create_track_dict(track)
        tracks_list.append(track_dict)

    tracks_list = sorted(tracks_list, key = itemgetter('rank'))

    return jsonify(tracks_list)


@app.route('/top-artists')
def return_top_artists():
    timeframe = request.args.get('timeframe')
    artists_list = []
    top_artists = crud.get_user_artists(session['user_id'], timeframe).all()

    for artist in top_artists:
        artist_dict = {
            'rank': artist.rank,
            'name': artist.artists.name,
            'img': artist.artists.artist_img,
            'url': artist.artists.url
        }
        artists_list.append(artist_dict)
    
    if not artists_list:
        artists_list.append(None)
    else:
        artists_list = sorted(artists_list, key = itemgetter('rank'))

    return jsonify(artists_list)


@app.route('/top-genres')
def return_top_genres():
    timeframe = request.args.get('timeframe')
    genres_list = []
    top_genres = crud.get_user_genres(session['user_id'], timeframe).all()

    for genre in top_genres:
        genre_dict = {
            'name': genre.genres.name,
            'freq': genre.freq
        }
        genres_list.append(genre_dict)
    
    if not genres_list:
        genres_list.append(None)
    else:
        genres_list = sorted(genres_list, key = itemgetter('freq'), reverse = True)

    return jsonify(genres_list)


@app.route('/playlist')
def create_top_playlist():

    utils.check_refresh_state()
    
    timeframe = request.args.get('timeframe')
    str_timeframe = timeframe.replace('_', ' ')
    str_timeframe = string.capwords(str_timeframe)
    current_date = date.today()
    name = f'{str_timeframe} Top Songs {str(current_date)}'

    creation_response = api_calls.create_playlist(user_id = session['user_id'],
                                                  name = name,
                                                  token = session['access_token'])

    playlist_id = creation_response['id']

    tracks = []
    top_tracks = crud.get_user_tracks(session['user_id'], timeframe).all()

    for track in top_tracks:
        uri = f'spotify:track:{track.track_id}'
        tracks.append(uri)
    
    playlist_response = api_calls.add_to_playlist(playlist_id = playlist_id,
                                                  tracks = tracks,
                                                  token = session['access_token'])

    return 'Success', 200


@app.route('/compare-tracks')
def return_track_compare():
    timeframe1 = request.args.get('timeframe1')
    timeframe2 = request.args.get('timeframe2')

    compare_top_tracks = data_processing.process_compare_tracks(user_id = session['user_id'],
                                                                timeframe1 = timeframe1,
                                                                timeframe2 = timeframe2)

    return jsonify(compare_top_tracks)


@app.route('/logout')
def log_out():
    session.clear()
    return 'Success', 200


if __name__ == '__main__':
    db_name = 'spotify-data'
    if len(sys.argv) > 1 and sys.argv[1] == 'test':
        db_name = 'test-spotify-data'
    connect_to_db(app, db_name)
    app.run(debug=True, host='0.0.0.0')