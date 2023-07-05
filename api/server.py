from flask import Flask, redirect, session, request, jsonify
from authlib.integrations.requests_client import OAuth2Session
from operator import itemgetter
from secret import CLIENT_ID, CLIENT_SECRET, generate_flask_key
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
app.secret_key = generate_flask_key()


@app.route('/login')
def oauth_login():
    """Access Spotify's login endpoint to authenticate the user and scopes."""
    scopes = ['user-top-read', 'user-read-private', 'playlist-modify-private']
    scopes = ' '.join(scopes)
    redirect_uri = 'https://wrap-app.dev/callback' # Prod redirect
    # redirect_uri = 'http://localhost:3000/callback' # Dev redirect
    client = OAuth2Session(CLIENT_ID,
                           CLIENT_SECRET,
                           scope = scopes, redirect_uri = redirect_uri)
    authorization_endpoint = 'https://accounts.spotify.com/authorize'
    uri, state = client.create_authorization_url(authorization_endpoint)
    session['state'] = state

    return redirect(uri)


@app.route('/callback')
def return_auth_code():
    """
    Callback route for Spotify's OAuth authentication.
    The route must be the same as what is registered on the dev console.
    Verifies state as what was initially sent to Spotify, stores auth code,
    and sends the status to the frontend.
    """

    code = request.args.get('code')
    state = request.args.get('state')
    uri = 'https://wrap-app.dev/callback' # Prod URI
    # uri = 'http://localhost:3000/callback' # Dev URI

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
    """API to send user's profile info to the frontend."""

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
    """Call Spotify API for top listening history by timeframe. Store in database."""

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
    """API to return top track information to frontend by timeframe."""

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
    """API to return top artist information to frontend by timeframe."""

    timeframe = request.args.get('timeframe')
    artists_list = []
    top_artists = crud.get_user_artists(session['user_id'], timeframe).all()

    for artist in top_artists:
        artist_dict = data_processing.create_artist_dict(artist)
        artists_list.append(artist_dict)
    
    if not artists_list:
        artists_list.append(None)
    else:
        artists_list = sorted(artists_list, key = itemgetter('rank'))

    return jsonify(artists_list)


@app.route('/top-genres')
def return_top_genres():
    """API to return top genre information to frontend by timeframe."""

    timeframe = request.args.get('timeframe')
    genres_list = []
    top_genres = crud.get_all_user_genres(session['user_id'], timeframe).all()

    for genre in top_genres:
        genre_dict = data_processing.create_genre_dict(genre)
        genres_list.append(genre_dict)
    
    if not genres_list:
        genres_list.append(None)
    else:
        genres_list = sorted(genres_list, key = itemgetter('freq'), reverse = True)

    return jsonify(genres_list)


@app.route('/playlist')
def create_top_playlist():
    """Create a Spotify playlist for the user by timeframe and send to Spotify API."""

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
    playlist_url = creation_response['external_urls']['spotify']

    tracks = []
    top_tracks = crud.get_user_tracks(session['user_id'], timeframe).all()

    for track in top_tracks:
        uri = f'spotify:track:{track.track_id}'
        tracks.append(uri)
    
    playlist_response = api_calls.add_to_playlist(playlist_id = playlist_id,
                                                  tracks = tracks,
                                                  token = session['access_token'])
    
    return jsonify(playlist_url)


@app.route('/compare-tracks')
def return_track_compare():
    """API to return top track comparison data by timeframes."""

    timeframe1 = request.args.get('timeframe1')
    timeframe2 = request.args.get('timeframe2')

    compare_top_tracks = data_processing.process_compare_tracks(user_id = session['user_id'],
                                                                timeframe1 = timeframe1,
                                                                timeframe2 = timeframe2)

    return jsonify(compare_top_tracks)


@app.route('/compare-artists')
def return_artist_compare():
    """API to return top artist comparison data by timeframes."""

    timeframe1 = request.args.get('timeframe1')
    timeframe2 = request.args.get('timeframe2')

    compare_top_artists = data_processing.process_compare_artists(user_id = session['user_id'],
                                                                  timeframe1 = timeframe1,
                                                                  timeframe2 = timeframe2)

    return jsonify(compare_top_artists)


@app.route('/compare-genres')
def return_genre_compare():
    """API to return top genre comparison data by timeframes."""

    timeframe1 = request.args.get('timeframe1')
    timeframe2 = request.args.get('timeframe2')

    compare_top_genres = data_processing.process_compare_genres(user_id = session['user_id'],
                                                                timeframe1 = timeframe1,
                                                                timeframe2 = timeframe2)
    
    return jsonify(compare_top_genres)


@app.route('/logout')
def log_out():
    """Clear all Flask session data on backend and remove user data from db."""
    
    if session.get('user_id', False):
        crud.delete_all_user_info(session['user_id'])
    session.clear()
    return 'Success', 200


if __name__ == '__main__':
    from waitress import serve # Prod WSGI
    db_name = 'spotify-data'

    if len(sys.argv) > 1 and sys.argv[1] == 'test':
        db_name = 'test-spotify-data'

    connect_to_db(app, db_name)
    serve(app, host='0.0.0.0', port=5000) # Prod Serve
    # app.run(host='0.0.0.0', debug=True) # Dev Serve