from server import session, redirect
from datetime import datetime, timezone
import api_calls
import data_processing


def check_refresh_state():
    """
    Check if authorization code expiration has passed. If it has, request a new code from the
    Spotify API.
    """

    if not session.get('login_state', False):
        return redirect('/logout')

    if session['expiration'] < datetime.now(timezone.utc):
        new_auth_codes = api_calls.refresh_auth_code(session['refresh_token'])
        authorization = new_auth_codes.json()
        data_processing.process_auth_codes(authorization)
