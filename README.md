# Wrap App

## Summary
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
You can log in to your Spotify account through OAuth2 to see your top listening history.
The app opens a popup directly to a Spotify login window.
![Spotify OAuth Page](/static/img/login.gif)


Once you are logged in, you can choose from three timeframe to "wrap" your listening history.
![Wrap Page](/static/img/wrap.gif)


The app shows you your top songs, artists, and genres. You can also choose to generate a playlist of your top 50 songs on your Spotify account.
![Wrap History](/static/img/wrap-history.gif)


You can also compare your listening history by timeframe.
![Compare Page](/static/img/compare.gif)


The compare feature shows you your listening history similarities over time.
![Compare History](/static/img/compare-history.gif)

## Installation

### Requirements
- PostgreSQL 14
- Python 3.9
- Spotify Web API client ID and secret.

**Important note!!**
You must have an app created in the [Spotify developer dashboard](https://developer.spotify.com/) with redirect URI set to where you are hosting this app, followed by `/callback`. (e.g. "https://hostedlink.com/callback).

In addition, you need to add users manually to the app on the dashboard for them to log in to the application while in dev mode. 

Once you're set with the requirements, follow these steps!

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
pip install requirements.txt
```

5. Save your Spotify developer API client ID and secret to a secrets file (e.g. secrets.sh). The variables should be named as the following:
```zsh
CLIENT_ID="abc123"
CLIENT_SECRET="abc123"
```
... Make sure that the variables are available in your environment:
```zsh
source secrets.sh
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
