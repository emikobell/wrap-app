from model import (db, User, Track, Artist, Genre, Timeframe,
                   UserTrack, UserArtist, UserGenre,
                   TrackArtist, ArtistGenre, connect_to_db)
import api_calls
from server import session


def create_user(spotify_id, display_name, img_url):
    """Create a user in db."""

    return User(spotify_id = spotify_id,
                display_name = display_name,
                img_url = img_url)


def get_user(spotify_id):
    """Get a user from the db."""

    return User.query.filter(User.spotify_id == spotify_id)


def create_track(spotify_id, name, album_img, url):
    """Create a track in db."""

    return Track(spotify_id = spotify_id,
                 name = name,
                 album_img = album_img,
                 url = url)


def get_track(spotify_id):
    """Get a track from the db."""

    return Track.query.filter(Track.spotify_id == spotify_id)


def create_tracks_in_db(track_info, user_id, timeframe):
    """
    Create a track object if it do not exist in the db.
    Then, create the provided user's top track object.
    """

    tracks_to_add = []

    if not get_track(track_info.get('spotify_id')).first():
        db_track = create_track(spotify_id = track_info['spotify_id'],
                                  name = track_info['name'],
                                  album_img = track_info['album_img'],
                                  url = track_info['url'])
        
        tracks_to_add.append(db_track)

    user_track = create_user_track(rank = track_info['rank'],
                                   track_id = track_info['spotify_id'], 
                                   user_id = user_id,
                                   timeframe = timeframe)
    
    tracks_to_add.append(user_track)

    return tracks_to_add


def create_artist(spotify_id, name, artist_img, url):
    """Create an artist in db."""

    return Artist(spotify_id = spotify_id,
                  name = name,
                  artist_img = artist_img,
                  url = url)


def get_artist(spotify_id):
    """Get a user from the db."""

    return Artist.query.filter(Artist.spotify_id == spotify_id)


def create_artists_in_db(artist_info, user_id, timeframe):
    """
    Create an artist object if it do not exist in the db.
    Then, create the provided user's top artist object.
    """

    artists_to_add = []

    if not get_artist(artist_info.get('spotify_id')).first():
        db_artist = create_artist(spotify_id = artist_info['spotify_id'],
                                  name = artist_info['name'],
                                  artist_img = artist_info['artist_img'],
                                  url = artist_info['url'])
        
        artists_to_add.append(db_artist)

    user_artist = create_user_artist(rank = artist_info['rank'],
                                     artist_id = artist_info['spotify_id'], 
                                     user_id = user_id,
                                     timeframe = timeframe)
    
    artists_to_add.append(user_artist)

    return artists_to_add


def create_genre(name):
    """Create a genre in db."""

    return Genre(name = name)


def get_genre(name):
    """Get a genre from the db by name."""

    return Genre.query.filter(Genre.name == name)


def create_genres_in_db(genres, genres_dict, artist_id):
    db_genres = [] 
    for genre in genres:
        genre_obj = get_genre(genre).first()

        # If the genre is in the dictionary, the object also exists
        if genres_dict.get(genre):
            genres_dict[genre]['freq'] += 1
        else:
            if not genre_obj:
                db_genre = create_genre(genre)
                # Need to commit for genre ID to be generated
                db.session.add(db_genre)
                db.session.commit()
                genre_obj = db_genre
            
            genres_dict[genre] = {'id': genre_obj.genre_id,
                                  'freq': 1}

        genre_id = genre_obj.genre_id

        # If the specific artist genre combo exists in arist_genres, skip
        if not get_artist_genre(artist_id, genre_id).first():
            db_artist_genre = create_artist_genre(artist_id, genre_id)
            db_genres.append(db_artist_genre)
    
    return db_genres, genres_dict


def create_user_track(rank, track_id, user_id, timeframe):
    """Create an instance in the user_tracks associative table."""
    
    return UserTrack(rank = rank,
                     track_id = track_id,
                     user_id = user_id,
                     timeframe = timeframe)


def get_user_tracks(user_id, timeframe):
    """Return user's top tracks."""

    return UserTrack.query.filter((UserTrack.user_id == user_id)
                                   & (UserTrack.timeframe == timeframe))


def get_top_user_track(user_id, timeframe):
    """Return user's top track."""

    return UserTrack.query.filter((UserTrack.user_id == user_id)
                                   & (UserTrack.timeframe == timeframe)
                                   & (UserTrack.rank == 1))

def delete_user_tracks(user_id, timeframe):
    """Delete a user's top tracks by timeframe."""

    UserTrack.query.filter((UserTrack.user_id == user_id)
                            & (UserTrack.timeframe == timeframe)).delete()


def create_user_artist(rank, artist_id, user_id, timeframe):
    """Create an instance in the user_artists associative table."""

    return UserArtist(rank = rank,
                      artist_id = artist_id,
                      user_id = user_id,
                      timeframe = timeframe)


def get_user_artists(user_id, timeframe):
    """Return user's top 10 artists."""

    return UserArtist.query.filter((UserArtist.user_id == user_id)
                                   & (UserArtist.timeframe == timeframe)
                                   & (UserArtist.rank <= 10))


def get_all_user_artists(user_id, timeframe):
    """Return user's top 50 artists."""

    return UserArtist.query.filter((UserArtist.user_id == user_id)
                                   & (UserArtist.timeframe == timeframe))


def get_top_user_artist(user_id, timeframe):
    """Return user's top artist."""

    return UserArtist.query.filter((UserArtist.user_id == user_id)
                                & (UserArtist.timeframe == timeframe)
                                & (UserArtist.rank == 1))
    

def delete_user_artists(user_id, timeframe):
    """Delete a user's top artists by timeframe."""

    UserArtist.query.filter((UserArtist.user_id == user_id)
                            & (UserArtist.timeframe == timeframe)).delete()


def create_user_genre(genre_id, user_id, freq, timeframe):
    """Create an instance in the user_genre associative table."""

    return UserGenre(genre_id = genre_id,
                     user_id = user_id,
                     freq = freq,
                     timeframe = timeframe)


def create_user_genres_in_db(genres_dict, user_id, timeframe):
    """Create user_genres in the db from a dictionary."""

    user_genres = []
    
    for genre in genres_dict.values():
        db_user_genre = create_user_genre(genre_id = genre['id'],
                                          user_id = user_id,
                                          freq = genre['freq'],
                                          timeframe = timeframe)
        user_genres.append(db_user_genre)
    
    return user_genres


def get_user_genres(user_id, timeframe):
    """Get a user's top genres by timeframe."""

    return UserGenre.query.filter((UserGenre.user_id == user_id)
                                   & (UserGenre.timeframe == timeframe))


def delete_user_genres(user_id, timeframe):
    """Delete a user's top genres by timeframe."""

    UserGenre.query.filter((UserGenre.user_id == user_id)
                            & (UserGenre.timeframe == timeframe)).delete() 


def create_track_artist(track_id, artist_id):
    """Create an instance in the track_artist associative table."""

    return TrackArtist(track_id = track_id,
                       artist_id = artist_id)


def create_track_artists_in_db(artists, track_id):

    db_track_artists = []

    for artist in artists:
        spotify_id, name, url = (
            artist['id'],
            artist['name'],
            artist['external_urls']['spotify']
        )

        artist_obj = get_artist(spotify_id).first()

        if not artist_obj:
            artist_data = api_calls.get_artist_from_api(artist['href'],
                                                        session['access_token'])
            
            artist_img = artist_data['images'][1]['url'] if artist_data['images'] else None

            artist_obj = create_artist(spotify_id, name, artist_img, url)
            # Artists need to be added to the db here to make sure duplicates are caught
            db.session.add(artist_obj)
            db.session.commit()

        artist_id = artist_obj.spotify_id

        if not get_track_artist(track_id, artist_id).first():
            db_track_artist = create_track_artist(track_id, artist_id)
            db_track_artists.append(db_track_artist)

    return db_track_artists


def get_track_artist(track_id, artist_id):
    """Get a track and artist pair."""

    return TrackArtist.query.filter((TrackArtist.track_id == track_id)
                                    & (TrackArtist.artist_id == artist_id))

def get_artists_for_track(track_id):
    """Get artists for a given track."""

    return TrackArtist.query.filter(TrackArtist.track_id == track_id)


def create_artist_genre(artist_id, genre_id):
    """Create an instance in the artist_genre associative table."""

    return ArtistGenre(artist_id = artist_id,
                       genre_id = genre_id)


def get_artist_genre(artist_id, genre_id):
    """Get an artist's genre."""

    return ArtistGenre.query.filter((ArtistGenre.artist_id == artist_id)
                                    & (ArtistGenre.genre_id == genre_id))