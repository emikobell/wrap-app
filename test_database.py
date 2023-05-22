from model import (db, User, Track, Artist, Genre, Timeframe,
                   UserTrack, UserArtist, UserGenre,
                   TrackArtist, ArtistGenre, connect_to_db)





if __name__ == '__main__':
    from server import app
    import os

    os.system('dropdb test-spotify-data')
    os.system('createdb test-spotify-data')
    os.system('psql test-spotify-data < sample_data.sql')
    connect_to_db(app, "test-spotify-data", echo = True)
    db.create_all()