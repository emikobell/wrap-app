from model import (db, User, Track, Artist, Genre, Timeframe,
                   UserTrack, UserArtist, UserGenre,
                   TrackArtist, ArtistGenre, connect_to_db)


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


def create_user_track(rank, track_id, user_id, timeframe):
    """Create an instance in the user_tracks associative table."""
    
    return UserTrack(rank = rank,
                     track_id = track_id,
                     user_id = user_id,
                     timeframe = timeframe)


def create_user_artist(rank, artist_id, user_id, timeframe):
    """Create an instance in the user_artists associative table."""

    return UserArtist(rank = rank,
                      artist_id = artist_id,
                      user_id = user_id,
                      timeframe = timeframe)


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


def delete_user_genres(user_id, timeframe):
    """Delete a user's top genres by timeframe."""

    UserGenre.query.filter((UserGenre.user_id == user_id)
                            & (UserGenre.timeframe == timeframe)).delete() 


def create_track_artist(track_id, artist_id):
    """Create an instance in the track_artist associative table."""

    return TrackArtist(track_id = track_id,
                       artist_id = artist_id)


def get_track_artist(track_id, artist_id):
    """Get a track's artist."""

    return TrackArtist.query.filter((TrackArtist.track_id == track_id)
                                    & (TrackArtist.artist_id == artist_id))


def create_artist_genre(artist_id, genre_id):
    """Create an instance in the artist_genre associative table."""

    return ArtistGenre(artist_id = artist_id,
                       genre_id = genre_id)


def get_artist_genre(artist_id, genre_id):
    """Get an artist's genre."""

    return ArtistGenre.query.filter((ArtistGenre.artist_id == artist_id)
                                    & (ArtistGenre.genre_id == genre_id))