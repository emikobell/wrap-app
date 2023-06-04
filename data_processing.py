import crud
from model import db
from server import session
from operator import itemgetter
from datetime import datetime, timedelta, timezone
import string

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


def create_track_dict(track, timeframe = None):
    """Create a dictionary of track info."""
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

    if timeframe:
        track_dict['timeframe'] = timeframe.replace('_', ' ')

    return track_dict


def process_compare_tracks(user_id, timeframe1, timeframe2):
    """
    Create a dictionary of top track comparison data.
    Data includes top tracks for each timeframe and common tracks across
    the two timeframes.
    """

    timeframe1_top_track = crud.get_top_user_track(user_id = user_id, timeframe = timeframe1).first()
    timeframe2_top_track = crud.get_top_user_track(user_id = user_id, timeframe = timeframe2).first()
    timeframe1_tracks = crud.get_user_tracks(user_id = user_id, timeframe = timeframe1).all()
    timeframe2_tracks = crud.get_user_tracks(user_id = user_id, timeframe = timeframe2).all()

    compare_tracks_dict = {
        'top_tracks': None,
        'similar_tracks': None,
        }

    if not timeframe1_tracks or not timeframe2_tracks:
        return compare_tracks_dict
    
    timeframe1_top_track = create_track_dict(track = timeframe1_top_track, timeframe = timeframe1)
    timeframe2_top_track = create_track_dict(track = timeframe2_top_track, timeframe = timeframe2)

    top_tracks = [timeframe1_top_track, timeframe2_top_track]

    similar_tracks = []

    for track1 in timeframe1_tracks:
        for track2 in timeframe2_tracks:
            if track1.track_id == track2.track_id:
                track_dict = create_track_dict(track1)
                similar_tracks.append(track_dict)
    
    compare_tracks_dict['top_tracks'] = top_tracks
    compare_tracks_dict['similar_tracks'] = similar_tracks

    return compare_tracks_dict
        

def create_artist_dict(artist, timeframe = None):
    """Create a dictionary of artist info."""
    artist_dict = {
            'rank': artist.rank,
            'name': artist.artists.name,
            'img': artist.artists.artist_img,
            'url': artist.artists.url
        }
    
    if timeframe:
        artist_dict['timeframe'] = timeframe.replace('_', ' ')

    return artist_dict


def process_compare_artists(user_id, timeframe1, timeframe2):
    """
    Create a dictionary of top artist comparison data.
    Data includes top artists for each timeframe and common artists across
    the two timeframes.
    """

    timeframe1_top_artist = crud.get_top_user_artist(user_id = user_id, timeframe = timeframe1).first()
    timeframe2_top_artist = crud.get_top_user_artist(user_id = user_id, timeframe = timeframe2).first()
    timeframe1_artists = crud.get_all_user_artists(user_id = user_id, timeframe = timeframe1).all()
    timeframe2_artists = crud.get_all_user_artists(user_id = user_id, timeframe = timeframe2).all()

    compare_artists_dict = {
        'top_artists': None,
        'similar_artists': None,
        }

    if not timeframe1_artists or not timeframe2_artists:
        return compare_artists_dict
    
    timeframe1_top_artist = create_artist_dict(artist = timeframe1_top_artist, timeframe = timeframe1)
    timeframe2_top_artist = create_artist_dict(artist = timeframe2_top_artist, timeframe = timeframe2)

    top_artists = [timeframe1_top_artist, timeframe2_top_artist]

    similar_artists = []

    for artist1 in timeframe1_artists:
        for artist2 in timeframe2_artists:
            if artist1.artist_id == artist2.artist_id:
                artist_dict = create_artist_dict(artist1)
                similar_artists.append(artist_dict)
    
    compare_artists_dict['top_artists'] = top_artists
    compare_artists_dict['similar_artists'] = similar_artists

    return compare_artists_dict


def create_genre_dict(genre, timeframe = None):
    """Create a dictionary of genre data."""

    genre_dict = {
            'name': genre.genres.name,
            'freq': genre.freq
        }
    
    if timeframe:
        genre_dict['timeframe'] = timeframe.replace('_', ' ')

    return genre_dict


def create_genre_dataset(timeframe1_genres, timeframe2_genres, timeframes):
    """
    Create a dataset of top genre comparison data for Chart js on the frontend.
    Data includes common top genres across the two timeframes, above the frequency
    of one.
    """

    str_timeframes = [timeframe.replace('_', ' ') for timeframe in timeframes]
    str_timeframes = [string.capwords(timeframe) for timeframe in str_timeframes]

    timeframe1_data = {
        'label': str_timeframes[0],
        'data': [],
        'fill': True,

    }
    timeframe2_data = {
        'label': str_timeframes[1],
        'data': [],
        'fill': True,
    }

    labels = []

    for genre1 in timeframe1_genres:
        for genre2 in timeframe2_genres:
            if (genre1.genre_id == genre2.genre_id) and (genre1.freq > 1 and genre2.freq > 1):
                labels.append(genre1.genres.name)
                timeframe1_data['data'].append(genre1.freq)
                timeframe2_data['data'].append(genre2.freq)

    if not timeframe1_data['data'] or not timeframe2_data['data']:
        return {}
    
    return {
        'labels': labels,
        'datasets': [timeframe1_data, timeframe2_data]
    }


def process_compare_genres(user_id, timeframe1, timeframe2):
    """
    Create a dataset of top genre comparison data for the frontend.
    Data includes top genres for each timeframe and Charts js data for visualization.
    """
        
    timeframe1_top_genre = crud.get_top_user_genre(user_id = user_id, timeframe = timeframe1).first()
    timeframe2_top_genre = crud.get_top_user_genre(user_id = user_id, timeframe = timeframe2).first()
    timeframe1_genres = crud.get_all_user_genres(user_id = user_id, timeframe = timeframe1).all()
    timeframe2_genres = crud.get_all_user_genres(user_id = user_id, timeframe = timeframe2).all()

    compare_genres_dict = {
        'top_genres': None,
        'genre_data': None,
        }

    if not timeframe1_genres or not timeframe2_genres:
        return compare_genres_dict
    
    timeframe1_top_genre = create_genre_dict(genre = timeframe1_top_genre, timeframe = timeframe1)
    timeframe2_top_genre = create_genre_dict(genre = timeframe2_top_genre, timeframe = timeframe2)

    compare_genres_dict['top_genres'] = [timeframe1_top_genre, timeframe2_top_genre]
    compare_genres_dict['genre_data'] = create_genre_dataset(timeframe1_genres,
                                                             timeframe2_genres,
                                                             [timeframe1, timeframe2])

    return compare_genres_dict