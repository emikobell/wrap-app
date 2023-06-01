import crud
from model import db
from server import session
from datetime import datetime, timedelta, timezone

def process_auth_codes(response):
    """
    Take the Spotify API Authorization/Refresh Code and add to session.
    """

    session['access_token'] = response['access_token']

    if response.get('refresh_token'):
        session['refresh_token'] = response['refresh_token']

    session['expiration'] = datetime.now(timezone.utc) + timedelta(seconds = response['expires_in'])
    session['login_state'] = True


def process_user_response(response):
    """
    Take the Spotify API User response as a dictionary,
    create db instance, and add to db.
    """

    spotify_id = response['id']
    display_name = response['display_name']
    img_url = response['images'][0]['url'] if response['images'] else None

    user = crud.create_user(spotify_id, display_name, img_url)
    
    db.session.add(user)
    db.session.commit()

    return user


def process_artist_response(response, user_id, timeframe):
    """
    Process the Spotify Top Artist API response as a dictionary.

    1. Delete a user's top artists from the db if this response's 
    timeframe overlaps with a past request.
    
    2. Delete a user's top genres from the db if this response's
    timeframe overlaps with a past request.

    3. If an artist in the response is not in the db, create artist
    in the db.

    4. Create the user's top artists in db.

    5. If a genre in the response is not in the db, create genre in
    the db.

    6. If an artist is not associated with a genre listed under them,
    add the relationship to the db.

    7. Create the user's top genres in db.
    """

    artists = response['items']
    genres_dict = {}
    db_add = []

    crud.delete_user_artists(user_id, timeframe)    
    crud.delete_user_genres(user_id, timeframe)

    for indx, artist in enumerate(artists):
        artist_info = {
            'spotify_id': artist['id'],
            'name': artist['name'],
            'artist_img': artist['images'][1]['url'] if artist['images'] else None,
            'url': artist['external_urls']['spotify'],
            'rank': str(indx + 1),
        }
        
        db_user_artists = crud.create_artists_in_db(artist_info,
                                                    user_id,
                                                    timeframe)
        # More items will be added to database later
        db_add.extend(db_user_artists)
        
        genres = artist['genres']

        db_genres, genres_dict = crud.create_genres_in_db(genres, genres_dict,
                                                          artist_info.get('spotify_id'))
        
        db_add.extend(db_genres)

    db_user_genres = crud.create_user_genres_in_db(genres_dict,
                                                   user_id,
                                                   timeframe)
    
    db_add.extend(db_user_genres)
    db.session.add_all(db_add)
    db.session.commit()
        

def process_track_response(response, user_id, timeframe):
    """
    Take the Spotify API User Top Tracks response as a dictionary,
    create db track instances, and adds to db.
    """

    crud.delete_user_tracks(user_id, timeframe) 
    tracks = response['items']
    db_add = []

    for indx, track in enumerate(tracks):
        track_info ={
            'spotify_id': track['id'],
            'name': track['name'],
            'album_img': track['album']['images'][1]['url'] if track['album']['images'] else None,
            'url': track['external_urls']['spotify'],
            'rank': str(indx + 1),
        }

        db_user_artists = crud.create_tracks_in_db(track_info, user_id, timeframe)
        
        db_add.extend(db_user_artists)

        artists = track['artists']

        db_track_artists = crud.create_track_artists_in_db(artists,
                                                           track_info.get('spotify_id'))
        
        db_add.extend(db_track_artists)
        
    db.session.add_all(db_add)
    db.session.commit()


def create_track_dict(track):
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

    return track_dict


def process_compare_tracks(user_id, timeframe1, timeframe2):
    timeframe1_tracks = crud.get_user_tracks(user_id = user_id, timeframe = timeframe1).all()
    timeframe2_tracks = crud.get_user_tracks(user_id = user_id, timeframe = timeframe2).all()

    compare_tracks_dict = {
        'top_tracks': None,
        'similar_tracks': None,
        }

    if not timeframe1_tracks or not timeframe2_tracks:
        return compare_tracks_dict
    
    timeframe1_top_track = create_track_dict(timeframe1_tracks[0])
    timeframe2_top_track = create_track_dict(timeframe2_tracks[0])

    top_tracks = [timeframe1_top_track, timeframe2_top_track]

    similar_tracks = []
    timeframe2_set = set(timeframe2_tracks) # Create a set for O(1) lookup

    for track in timeframe1_tracks:
        if track in timeframe2_set:
            track_dict = create_track_dict(track)
            similar_tracks.append(track_dict)

    compare_tracks_dict['top_tracks'] = top_tracks
    compare_tracks_dict['similar_tracks'] = similar_tracks

    return compare_tracks_dict
        
    