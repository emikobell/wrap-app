from flask import Flask, render_template, redirect, session, request
import requests
from authlib.integrations.requests_client import OAuth2Session
import os
import secrets
import base64

app = Flask(__name__)
app.secret_key = secrets.token_hex(16)

@app.route('/login')
def oauth_login():
    scope = 'user-top-read'
    redirect_uri = 'http://localhost:5000/callback'
    client = OAuth2Session(os.environ['CLIENT_ID'], os.environ['CLIENT_SECRET'], scope=scope, redirect_uri=redirect_uri)
    authorization_endpoint = 'https://accounts.spotify.com/authorize'
    uri, state = client.create_authorization_url(authorization_endpoint)
    session['state'] = state
    return redirect(uri)

@app.route('/callback')
def return_auth_code():
    code = request.args.get('code')
    state = request.args.get('state')
    url = 'https://accounts.spotify.com/api/token'
    client_id = os.environ['CLIENT_ID']
    client_secret = os.environ['CLIENT_SECRET']
    auth_str = base64.b64encode(client_id.encode() + b':' + client_secret.encode()).decode('utf-8')

    payload = {
        'body': {
            'grant_type': 'authorization_code',
            'code': code,
            'redirect_uri': 'http://localhost:5000/callback',
            },
        'header': {
            'Authorization': f'Basic {auth_str}',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    }

    if state != session['state']:
        return redirect('/error/auth_error')

    response = requests.post(url, data=payload['body'], headers=payload['header'])

    try:
        response.raise_for_status()
    except Exception:
        return redirect('/error/auth_error')

    authorization = response.json()
    session['access_token'] = authorization['access_token']
    session['refresh_token'] = authorization['refresh_token']

    return redirect('/wrap')

@app.route('/wrap')
def call_top_info():
    url = 'https://api.spotify.com/v1/me/top/tracks?limit=50&offset=0&time_range=long_term'
    header= {
        'Authorization': 'Bearer ' + session['access_token'],
    }
    response = requests.get(url, headers=header)
    response_json = response.json()
    print(response_json)

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
    app.run(debug=True, host='0.0.0.0')