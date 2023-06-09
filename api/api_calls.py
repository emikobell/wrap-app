from secret import CLIENT_ID, CLIENT_SECRET
import requests
import base64


def generate_auth_str():
    """Generate auth string for Spotify API calls."""
    return base64.b64encode(CLIENT_ID.encode() + b':' 
                                + CLIENT_SECRET.encode()).decode('utf-8')


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
            'redirect_uri': 'https://wrap-app.dev/api/callback', # Prod callback 
            # 'redirect_uri': 'http://localhost:3000/callback', # Dev callback
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
    """Make a user top artist call to the Spotify API."""

    url = f'https://api.spotify.com/v1/me/top/artists?limit=50&offset=0&time_range={timeframe}'
    header = {'Authorization': f'Bearer {token}'}
    response_json = requests.get(url, headers = header)

    return response_json.json()


def make_track_call(token, timeframe):
    """Make an user top track call to the Spotify API."""

    url = f'https://api.spotify.com/v1/me/top/tracks?limit=50&offset=0&time_range={timeframe}'
    header = {'Authorization': f'Bearer {token}'}
    response_json = requests.get(url, headers = header)

    return response_json.json()


def get_artist_from_api(href, token):
    """Make a artist call to get information about an artist from the Spotify API."""

    header = {'Authorization': f'Bearer {token}'}
    response_json = requests.get(href, headers = header)

    return response_json.json()


def create_playlist(user_id, name, token):
    """Make a playlist creation call to the Spotify API."""

    url = f'https://api.spotify.com/v1/users/{user_id}/playlists'

    payload = {
        'body': {
            'name': name,
            'description': 'Your top songs generated by the wrap project.',
            'public': False,
            },
        'header': {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {token}',
        },
    }

    response_json = requests.post(url, headers = payload['header'], json = payload['body'])

    return response_json.json()


def add_to_playlist(playlist_id, tracks, token):
    """Make an add to playlist API call to an existing playlist on Spotify."""

    url = f'https://api.spotify.com/v1/playlists/{playlist_id}/tracks'

    payload = {
        'body': {
            'uris': tracks,
            'position': 0,   
            },
        'header': {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {token}',
            },
    }

    response_json = requests.post(url, headers = payload['header'], json = payload['body'])

    return response_json.json()