from flask import Flask, render_template, redirect, session, request
from authlib.integrations.requests_client import OAuth2Session
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
def call_top_info():

    timeframe = 'long_term' # Once frontend is set up, this will be set from there

    if session['expiration'] > datetime.now(timezone.utc):
        new_auth_codes = api_calls.refresh_auth_code(session['refresh_token'])

    user_profile = api_calls.make_user_call(session['access_token'])
    # Should add error handling here

    if not crud.get_user(user_profile.get('id')).first():
        data_processing.process_user_response(user_profile)

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


    
    return render_template('index.html')


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