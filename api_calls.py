import os
import requests
import base64


def generate_auth_str():
    client_id = os.environ.get('CLIENT_ID')
    client_secret = os.environ.get('CLIENT_SECRET')

    return base64.b64encode(client_id.encode() + b':' 
                                + client_secret.encode()).decode('utf-8')


def get_auth_code(code, uri):
    """Get initial authorization code from Spotify API."""

    url = 'https://accounts.spotify.com/api/token'

    auth_str = generate_auth_str()

    payload = {
        'body': {
            'grant_type': 'authorization_code',
            'code': code,
            'redirect_uri': uri,
            },
        'header': {
            'Authorization': f'Basic {auth_str}',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    }

    return requests.post(url, data = payload['body'], headers = payload['header'])
    

def refresh_auth_code(refresh_token):
    """Get refresh authorization code from Spotify API."""

    url = 'https://accounts.spotify.com/api/token'
    
    auth_str = generate_auth_str()

    payload = {
        'body': {
            'grant_type': 'refresh_token',
            'refresh_token': refresh_token,
            'redirect_uri': 'http://localhost:5000/callback',
            },
        'header': {
            'Authorization': f'Basic {auth_str}',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    }

    return requests.post(url, data = payload['body'], headers = payload['header'])


def make_user_call(token):
    """Make a user profile call to the Spotify API."""

    url = 'https://api.spotify.com/v1/me'
    header = {'Authorization': f'Bearer {token}'}
    response_json = requests.get(url, headers = header)
    
    return response_json.json()


def make_artist_call(token, timeframe):
    """Make an user top artist call to the Spotify API."""

    url = f'https://api.spotify.com/v1/me/top/artists?limit=50&offset=0&time_range={timeframe}'
    header = {'Authorization': f'Bearer {token}'}
    response_json = requests.get(url, headers = header)

    return response_json.json()

def make_track_call(token, timeframe):
    """Make an user top artist call to the Spotify API."""

    url = f'https://api.spotify.com/v1/me/top/tracks?limit=50&offset=0&time_range={timeframe}'
    header = {'Authorization': f'Bearer {token}'}
    response_json = requests.get(url, headers = header)

    return response_json.json()


def get_artist_from_api(href, token):
    """Make a artist API call to get information about an artist."""

    header = {'Authorization': f'Bearer {token}'}
    response_json = requests.get(href, headers = header)

    return response_json.json()