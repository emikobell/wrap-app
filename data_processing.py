import crud
from model import db


def create_artists_in_db(artist_info, user_id, timeframe):
    """
    Create artist objects if they do not exist,
    then create user's top artist object.
    """
    artists_to_add = []

    if not crud.get_artist(artist_info.get('spotify_id')).first():  #If the artist doesn't exist, create in artist table
        db_artist = crud.create_artist(spotify_id = artist_info['spotify_id'],
                                       name = artist_info['name'],
                                       artist_img = artist_info['artist_img'],
                                       url = artist_info['url'])
        artists_to_add.append(db_artist)

    user_artist = crud.create_user_artist(rank = artist_info['rank'],
                                          artist_id = artist_info['spotify_id'], 
                                          user_id = user_id,
                                          timeframe = timeframe)
    
    artists_to_add.append(user_artist)

    return artists_to_add


def process_user_response(response):
    """
    Take the Spotify API User response as a dictionary,
    create db instance, and add to db.
    """

    spotify_id = response['id']
    display_name = response['display_name']
    image = response['images'][0]
    img_url = image.get('url', None)

    user = crud.create_user(spotify_id = spotify_id,
                            display_name = display_name,
                            img_url = img_url)
    
    db.session.add(user)
    db.session.commit()


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
    db_artists = []
    db_artist_genres = []
    db_user_genres = []

    crud.delete_user_artists(user_id = user_id, timeframe = timeframe)    
    crud.delete_user_genres(user_id = user_id, timeframe = timeframe)

    for indx, artist in enumerate(artists):
        artist_info = {
            'spotify_id': artist['id'],
            'name': artist['name'],
            'artist_img': artist['images'][1]['url'],
            'url': artist['external_urls']['spotify'],
            'rank': str(indx + 1)
        }
        
        db_user_artists = create_artists_in_db(artist_info = artist_info,
                                               user_id = user_id,
                                               timeframe = timeframe)
        db_artists.extend(db_user_artists)
        
        genres = artist['genres']

        for genre in genres:
            genre_obj = crud.get_genre(genre).first()

            if genres_dict.get(genre):
                genres_dict[genre]['freq'] += 1
            else:
                if not genre_obj:
                    db_genre = crud.create_genre(genre)
                    db.session.add(db_genre)
                    db.session.commit()
                    genre_obj = db_genre
                
                genres_dict[genre] = {'id': genre_obj.genre_id,
                                      'freq': 1}

            # if the specific artist genre combo exists, skip
            if not crud.get_artist_genre(artist_id = artist_info['spotify_id'],
                                         genre_id = genre_obj.genre_id).first():
                db_artist_genre = crud.create_artist_genre(artist_id = artist_info['spotify_id'],
                                                           genre_id = genre_obj.genre_id)
                db_artist_genres.append(db_artist_genre)

    db.session.add_all(db_artists)
    db.session.add_all(db_artist_genres)
    db.session.commit()

    for genre in genres_dict.values():
        db_user_genre = crud.create_user_genre(genre_id = genre['id'],
                                               user_id = user_id,
                                               freq = genre['freq'],
                                               timeframe = timeframe)
        db_user_genres.append(db_user_genre)
    
    db.session.add_all(db_user_genres)
    db.session.commit()
        

def process_track_response(response):
    """
    Take the Spotify API User Top Tracks response as a dictionary,
    create db track instances, and adds to db.
    """

    tracks = response['items']
    db_tracks = []

    for indx, track in enumerate(tracks):
        spotify_id = track['id']
        name = track['name']
        album_img = track['album']['images'][1]['url']
        url = track['external_urls']['spotify']
        rank = str(indx + 1)

        db_track = crud.create_track(spotify_id = spotify_id,
                                  name = name,
                                  album_img = album_img,
                                  url = url)
        
        db_tracks.append(db_track)
        
    db.session.add_all(db_tracks)
    db.session.commit()