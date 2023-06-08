# Wrap App

The Wrap App is a tool designed for Spotify users to easily view their top tracks, artists, and genres across their listening history at any time. This app enables authenticated users to view their top listening histories and compare them across different timeframes. Users can choose a timeframe that spans a month, six months, or several years to summarize their top items. Additionally, the compare feature of the Wrap App enables users to identify and explore the similarities between their chosen timeframes, offering insights into their listening histories across time.

## Tech Stack
### Backend
- Python
- Flask
- OAuth2Session
- PostgreSQL
- SQLAlchemy

### Frontend
- Javascript
- React js
- Jinja
- AJAX
- CSS
- Bootstrap
- Chart js

### APIs
- Spotify Web API

## Features

### Login

You can log in to your Spotify account through OAuth2 to see your top listening history.
The app opens a popup directly to a Spotify login window.
<br />

![Spotify OAuth Page](/static/img/login.gif)
<br /> <br />

### Wrap Feature

Once you are logged in, you can choose from three timeframes to "wrap" your listening history.
<br />

![Wrap Page](/static/img/wrap.gif)
<br /> <br />

The app shows you your top songs, artists, and genres. You can also choose to generate a playlist of your top 50 songs on your Spotify account.
<br />

![Wrap History](/static/img/wrap-history.gif)
<br /> <br />


### Compare Feature

You can also compare your listening history by timeframe.
<br />

![Compare Page](/static/img/compare.gif)
<br /> <br />

The compare feature shows you your listening history similarities over time.
<br />

![Compare History](/static/img/compare-history.gif)
<br /> <br />


## Installation

### Requirements
- PostgreSQL 14
- Python 3.9
- Spotify Web API client ID and secret

**Important note!!**
You must have an app created in the [Spotify developer dashboard](https://developer.spotify.com/) with the redirect URI set to where you are hosting this app, followed by `/callback`. (e.g. https://hostedlink.com/callback).

In addition, you need to add users manually to the app on the dashboard for them to log in to the application while in dev mode. 

Once you're set with the requirements, you're ready to start!

### Steps

1. Clone the github repository.
```zsh
git clone https://github.com/emikobell/wrap-app
```

2. Create a virtual environment using virtualenv.
```zsh
virtualenv env
```

3. Activate the virtual environment.
```zsh
source env/bin/activate
```

4. Install the dependencies provided in requirements.txt.
```zsh
pip3 install -r requirements.txt
```

5. Create a secret.py file to save your Spotify developer API client ID, secret, and Flask key.
server.py will be importing the following:
```python
CLIENT_ID = 'abc123'
CLIENT_SECRET = 'abc123'
def generate_flask_key():
    # Your method of generating the key here
    return key
```

6. Create a database called 'spotify-data'.
```zsh
createdb spotify-data
```

7. Run model.py to create the database tables.
```zsh
python3 model.py
```

8. Run the Flask server.
```zsh
python3 server.py
```
