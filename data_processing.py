import crud
from model import db
import api_calls
from server import session


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