from flask_sqlalchemy import SQLAlchemy
import os

db = SQLAlchemy()

class User(db.Model):
    """Class for users in the db."""

    __tablename__ = 'users'

    spotify_id = db.Column(db.String, primary_key = True, nullable = False, unique = True)
    display_name = db.Column(db.String, nullable = True)
    img_url = db.Column(db.String, nullable = True)

    user_tracks = db.relationship('UserTrack', back_populates = 'users')
    user_artists = db.relationship('UserArtist', back_populates = 'users')
    user_genres = db.relationship('UserGenre', back_populates = 'users')

    def __repr__(self):
        return f'<User Name {self.display_name} Spotify ID: {self.spotify_id}>'
    
class Track(db.Model):
    """Class for tracks in the db."""

    __tablename__ = 'tracks'

    spotify_id = db.Column(db.String, primary_key = True, nullable = False, unique = True)
    name = db.Column(db.String, nullable = False)
    album_img = db.Column(db.String, nullable = True)
    url = db.Column(db.String, nullable = False)

    user_tracks = db.relationship('UserTrack', back_populates = 'tracks')
    track_artists = db.relationship('TrackArtist', back_populates = 'tracks')

    def __repr__(self):
        return f'<Track Title: {self.name} Spotify ID: {self.spotify_id}>'
    
class Artist(db.Model):
    """Class for artists in the db."""

    __tablename__ = 'artists'

    spotify_id = db.Column(db.String, primary_key = True, nullable = False, unique = True)
    name = db.Column(db.String, nullable = False)
    artist_img = db.Column(db.String, nullable = True)
    url = db.Column(db.String, nullable = False)

    user_artists = db.relationship('UserArtist', back_populates = 'artists')
    track_artists = db.relationship('TrackArtist', back_populates = 'artists')
    artist_genres = db.relationship('ArtistGenre', back_populates = 'artists')

    def __repr__(self):
        return f'<Artist Name: {self.name} Spotify ID: {self.spotify_id}>'

class Genre(db.Model):
    """Class for genres in the db."""

    __tablename__ = 'genres'

    genre_id = db.Column(db.Integer, primary_key = True, autoincrement = True, nullable = False)
    name = db.Column(db.String, nullable = False)

    user_genres = db.relationship('UserGenre', back_populates = 'genres') 
    artist_genres = db.relationship('ArtistGenre', back_populates = 'genres')

    def __repr__(self):
        return f'<Genre Name: {self.name} Genre ID: {self.genre_id}>'

class Timeframe(db.Model):
    """Class for timeframes in the db."""

    __tablename__ = 'timeframes'

    timeframe = db.Column(db.String, primary_key = True, nullable = False, unique = True)

    user_tracks = db.relationship('UserTrack', back_populates = 'timeframes')
    user_artists = db.relationship('UserArtist', back_populates = 'timeframes')
    user_genres = db.relationship('UserGenre', back_populates = 'timeframes')

    @classmethod
    def create_timeframes(cls, timeframe_list):
        """
        Create and add timeframe to db.
        Meant to be used one time when the db is initialized.
        """
        timeframes_to_add = []

        for time in timeframe_list:
            timeframe = cls(timeframe = time)
            timeframes_to_add.append(timeframe)

        db.session.add_all(timeframes_to_add)
        db.session.commit()

    def __repr__(self):
        return f'<Timeframe: {self.timeframe}>'

class UserTrack(db.Model):
    """
    Class for associative table between users and tracks.
    List tracks associated with each user, their rankings, and timeframes.
    """

    __tablename__ = 'user_tracks'

    user_track_id = db.Column(db.Integer, primary_key = True, autoincrement = True, nullable = False)
    rank = db.Column(db.Integer, nullable = False)
    track_id = db.Column(db.String, db.ForeignKey('tracks.spotify_id'), nullable = False)
    user_id = db.Column(db.String, db.ForeignKey('users.spotify_id'), nullable = False)
    timeframe = db.Column(db.String, db.ForeignKey('timeframes.timeframe'), nullable = False)

    users = db.relationship('User', back_populates = 'user_tracks')
    tracks = db.relationship('Track', back_populates = 'user_tracks')
    timeframes = db.relationship('Timeframe', back_populates = 'user_tracks')

    def __repr__(self):
        return f'<User Track ID: {self.user_track_id} User: {self.user_id} Track: {self.track_id} Timeframe: {self.timeframe}>'

class UserArtist(db.Model):
    """
    Class for associative table between users and artists.
    List artists associated with each user, their rankings, and timeframes.
    """

    __tablename__ = 'user_artists'

    user_artist_id = db.Column(db.Integer, primary_key = True, autoincrement = True, nullable = False)
    rank = db.Column(db.Integer, nullable = False)
    artist_id = db.Column(db.String, db.ForeignKey('artists.spotify_id'), nullable = False)
    user_id = db.Column(db.String, db.ForeignKey('users.spotify_id'), nullable = False)
    timeframe = db.Column(db.String, db.ForeignKey('timeframes.timeframe'), nullable = False)

    users = db.relationship('User', back_populates = 'user_artists')
    artists = db.relationship('Artist', back_populates = 'user_artists')
    timeframes = db.relationship('Timeframe', back_populates = 'user_artists')

    def __repr__(self):
        return f'<User Artist ID: {self.user_artist_id} User: {self.user_id} Artist: {self.artist_id} Timeframe: {self.timeframe}>'
    
class UserGenre(db.Model):
    """
    Class for associative table between users and genres.
    List genres associated with each user and their timeframes.
    """

    __tablename__ = 'user_genres'

    user_genre_id = db.Column(db.Integer, primary_key = True, autoincrement = True, nullable = False)
    genre_id = db.Column(db.Integer, db.ForeignKey('genres.genre_id'), nullable = False)
    user_id = db.Column(db.String, db.ForeignKey('users.spotify_id'), nullable = False)
    freq = db.Column(db.Integer, nullable = False)
    timeframe = db.Column(db.String, db.ForeignKey('timeframes.timeframe'), nullable = False)

    users = db.relationship('User', back_populates = 'user_genres')
    genres = db.relationship('Genre', back_populates = 'user_genres')
    timeframes = db.relationship('Timeframe', back_populates = 'user_genres')
    
    def __repr__(self):
        return f'<User Genre ID: {self.user_genre_id} User: {self.user_id} Genre: {self.genre_id} Timeframe: {self.timeframe}>'

class TrackArtist(db.Model):
    """
    Class for associative table between tracks and artists.
    """

    __tablename__ = 'track_artists'

    track_artist_id = db.Column(db.Integer, primary_key = True, autoincrement = True, nullable = False)
    track_id = db.Column(db.String, db.ForeignKey('tracks.spotify_id'), nullable = False)
    artist_id = db.Column(db.String, db.ForeignKey('artists.spotify_id'), nullable = False)

    tracks = db.relationship('Track', back_populates = 'track_artists')
    artists = db.relationship('Artist', back_populates = 'track_artists')
    
    def __repr__(self):
        return f'<Track Artist ID: {self.track_artist_id} Track: {self.track_id} Artist: {self.artist_id}>'

class ArtistGenre(db.Model):
    """
    Class for associative table between artists and genres.
    """

    __tablename__ = 'artist_genres'

    artist_genre_id = db.Column(db.Integer, primary_key = True, autoincrement = True, nullable = False)
    artist_id = db.Column(db.String, db.ForeignKey('artists.spotify_id'), nullable = False)
    genre_id = db.Column(db.Integer, db.ForeignKey('genres.genre_id'), nullable = False)

    artists = db.relationship('Artist', back_populates = 'artist_genres')
    genres = db.relationship('Genre', back_populates = 'artist_genres')

    def __repr__(self):
        return f'<Artist Genre ID: {self.artist_genre_id} Artist: {self.artist_id} Genre: {self.genre_id}>'
    

def connect_to_db(app, db_name, echo = False):
    """Connect to PostgreSQL database."""

    app.config['SQLALCHEMY_DATABASE_URI'] = f'postgresql:///{db_name}'
    app.config['SQLALCHEMY_ECHO'] = echo
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.app = app
    db.init_app(app)

    print(f'Connected to {db_name} db.')


if __name__ == '__main__':
    from server import app

    timeframes = ['short_term', 'medium_term', 'long_term']

    os.system('dropdb spotify-data')
    os.system('createdb spotify-data')
    
    connect_to_db(app, 'spotify-data', echo = True)
    db.create_all()
    Timeframe.create_timeframes(timeframes)    