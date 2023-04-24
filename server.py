from flask import Flask, render_template, redirect, session, request
import requests
from authlib.integrations.requests_client import OAuth2Session
import os
import secrets
import base64

app = Flask(__name__)
app.secret_key = secrets.token_hex(16)

@app.route('/login')
def test_oauth():
    scope = 'user-top-read'
    redirect_uri = 'http://localhost:5000/callback'
    client = OAuth2Session(os.environ['CLIENT_ID'], os.environ['CLIENT_SECRET'], scope=scope, redirect_uri=redirect_uri)
    authorization_endpoint = 'https://accounts.spotify.com/authorize'
    uri, state = client.create_authorization_url(authorization_endpoint)
    session['state'] = state
    return redirect(uri)

@app.route('/callback')
def test_return():
    code = request.args.get('code')
    state = request.args.get('state')
    url = 'https://accounts.spotify.com/api/token'
    client_id = os.environ['CLIENT_ID']
    client_secret = os.environ['CLIENT_SECRET']
    auth_str = base64.b64encode(client_id.encode() + b':' + client_secret.encode()).decode('utf-8')
    print(auth_str)
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
        return '<html><body>something went wrong</body></html>'

    response = requests.post(url, data=payload['body'], headers=payload['header'])
    print(response)
    return redirect('/wrap')

@app.route('/wrap')
def call_top_info():
    pass

@app.route('/logout')
def log_out():
    session.pop('state')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')