import crud
from model import db


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