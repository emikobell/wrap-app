from flask import Flask, render_template, redirect, session, request, jsonify
from authlib.integrations.requests_client import OAuth2Session
from operator import itemgetter
import os
import secrets
import crud
import data_processing
import api_calls
from model import connect_to_db, db
from datetime import datetime, timedelta, timezone

app = Flask(__name__)
app.app_context().push()
app.secret_key = secrets.token_hex(16)


@app.route('/login')
def oauth_login():
    scopes = ['user-top-read', 'user-read-private', 'user-read-email']
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
        return redirect('/error/auth_error')

    response = api_calls.get_auth_code(code, uri)

    try:
        response.raise_for_status()
    except Exception:
        return redirect('/error/auth_error')

    authorization = response.json()

    session['access_token'] = authorization['access_token']
    session['refresh_token'] = authorization['refresh_token']
    session['expiration'] = datetime.now(timezone.utc) + timedelta(seconds = authorization['expires_in'])

    return redirect('/wrap')


@app.route('/wrap')
def gather_wrap_data():

    timeframe = 'long_term' # Once frontend is set up, this will be set from there

    if session['expiration'] > datetime.now(timezone.utc):
        new_auth_codes = api_calls.refresh_auth_code(session['refresh_token'])

    user_profile = api_calls.make_user_call(session['access_token'])
    # Should add error handling here

    db_user = crud.get_user(user_profile.get('id')).first()

    if not db_user:
        db_user = data_processing.process_user_response(user_profile)
    
    session['user_id'] = db_user.spotify_id

    user_top_artists = api_calls.make_artist_call(token = session['access_token'],
                                                  timeframe = timeframe)
    
    # Should add error handling here

    data_processing.process_artist_response(response = user_top_artists,
                                            user_id = user_profile['id'],
                                            timeframe = timeframe)
    
    user_top_tracks = api_calls.make_track_call(token = session ['access_token'],
                                                timeframe = timeframe)
    
    # Should add error handling here

    data_processing.process_track_response(response = user_top_tracks,
                                           user_id= user_profile['id'],
                                           timeframe= timeframe)
    
    # render_template('app_page.html')
    return redirect('/jinja-test')


@app.route('/jinja-test')
def return_all_items():
    timeframe = 'long_term'
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
    
    tracks_list = []
    top_tracks = crud.get_user_tracks(session['user_id'], timeframe).all()

    for track in top_tracks:
        artist_list = []
        artists = crud.get_artists_for_track(track.track_id).all()

        for artist in artists:
            artist_info = {
                'name': artist.artists.name,
                'url': artist.artists.url
            }
            artist_list.append(artist_info)

        track_dict = {
            'rank': track.rank,
            'name': track.tracks.name,
            'img': track.tracks.album_img,
            'url': track.tracks.url,
            'artists': artist_list
        }

        tracks_list.append(track_dict)

    genres_list = []
    top_genres = crud.get_user_genres(session['user_id'], timeframe).all()

    for genre in top_genres:
        genre_dict = {
            'name': genre.genres.name,
            'freq': genre.freq
        }
        genres_list.append(genre_dict)
    
    genres_list = sorted(genres_list, key = itemgetter('freq'), reverse = True)
    
    return render_template('app_page.html', artists = artists_list,
                           tracks = tracks_list, genres = genres_list)


@app.route('/top_artists')
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

    return jsonify(artists_list)


@app.route('/top_tracks')
def return_top_tracks():
    timeframe = request.args.get('timeframe')
    tracks_list = []
    top_tracks = crud.get_user_tracks(session['user_id'], timeframe).all()

    for track in top_tracks:
        artists_list = []
        artists = crud.get_artists_for_track(track.track_id).all()

        for artist in artists:
            artist_info = {
                'name': artist.artists.name,
                'url': artist.artists.url
            }
            artists_list.append(artist_info)

        track_dict = {
            'rank': track.rank,
            'name': track.tracks.name,
            'img': track.tracks.album_img,
            'url': track.tracks.url,
            'artists': artists_list
        }

        tracks_list.append(track_dict)


    return jsonify(tracks_list)

@app.route('/top_genres')
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
    
    genres_list = sorted(genres_list, key = itemgetter('freq'), reverse = True)
        
    return jsonify(genres_list)


@app.route('/logout')
def log_out():
    session.pop('state')


@app.route('/error/<id>')
def show_error(id):
    if id == 'auth_error':
        return 'There was a problem authenticating' # PLACEHOLDER - return error template
    # For each kind of error, render templates/pages


if __name__ == '__main__':
    connect_to_db(app, 'spotify-data')
    app.run(debug=True, host='0.0.0.0')