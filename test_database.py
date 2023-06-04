from model import (db, Timeframe, connect_to_db)
import sys

if __name__ == '__main__':
    from server import app
    import os

    use_data = len(sys.argv) > 1 and sys.argv[1] == 'use_data'
    timeframes = ['short_term', 'medium_term', 'long_term']

    os.system('dropdb test-spotify-data')
    os.system('createdb test-spotify-data')
    if use_data:
        os.system('psql test-spotify-data < sample_data.sql')
    
    connect_to_db(app, 'test-spotify-data')
    db.create_all()
    Timeframe.create_timeframes(timeframes)