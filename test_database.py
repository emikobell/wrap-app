from model import (db, User, Track, Artist, Genre, Timeframe,
                   UserTrack, UserArtist, UserGenre,
                   TrackArtist, ArtistGenre, connect_to_db)
from server import app





if __name__ == '__main__':
    from server import app
    connect_to_db(app, "test-spotify-data", echo = True)
    db.create_all()