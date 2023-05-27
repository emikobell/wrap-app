const WrapHistory = (props) => {

    const {timeframe} = props;
    const [topTracks, setTopTracks] = React.useState([]);
    const [topArtists, setTopArtists] = React.useState([]);
    const [topGenres, setTopGenres] = React.useState([]);

    React.useEffect(() => {
        const fetchTopItems =  async (timeframe) => { 
            const response = await fetch(`/wrap-history?timeframe=${timeframe}`);
            // Put error handling here
            if (response.status == 200) {
                const topTracksResponse = await fetch(`/top-tracks?timeframe=${timeframe}`);
                // Put error handling here
                const topTracksParsed = await topTracksResponse.json();
                setTopTracks(topTracksParsed);

                if (topTracks) {
                    const topArtistsResponse = await fetch(`/top-artists?timeframe=${timeframe}`);
                    // Put error handling here
                    const topArtistsParsed = await topArtistsResponse.json();
                    setTopArtists(topArtistsParsed);

                    if (topArtists) {
                        const topGenresResponse = await fetch(`/top-genres?timeframe=${timeframe}`);
                        // Put error handling here
                        const topGenresParsed = await topGenresResponse.json();
                        setTopGenres(topGenresParsed);
                    }
                }
            };
        };
        fetchTopItems(timeframe);
    }, []);

    if (topTracks.length == 0 || topArtists.length == 0 || topGenres.length == 0){
        return (
        <React.Fragment>
            <ReactBootstrap.Row className="justify-content-center">
                <ReactBootstrap.Col xs="auto" className="p-5">
                    <h1>Loading...</h1>
                </ReactBootstrap.Col>
            </ReactBootstrap.Row>
        </React.Fragment>
        )
    } else if (!topTracks[0] || !topArtists[0] || !topGenres[0]) {
        return (
        <React.Fragment>
            <ReactBootstrap.Row className="justify-content-center">
                <ReactBootstrap.Col xs="auto" className="p-5">
                    <h1>No results :&#40;</h1>
                    <p>
                        Your Spotify profile doesn't have top items. This might be because your profile is too new. <br />
                        Please try again in the future after you've listened to some songs!
                    </p>
                </ReactBootstrap.Col>
            </ReactBootstrap.Row>
        </React.Fragment>
        )
    }

    return (
        <React.Fragment>
            <ReactBootstrap.Container id="wrap-history-greeting">
                <ReactBootstrap.Row className="justify-content-center">
                    <ReactBootstrap.Col xs="auto" className="p-5">
                        <h1>Hi, {props.username}! </h1>
                        <h2>Here's your wrap history.</h2>
                    </ReactBootstrap.Col>
                </ReactBootstrap.Row>
            </ReactBootstrap.Container>
            <TopTrack topTracks={topTracks} />
            <AllTracks topTracks={topTracks} />
            <TopArtist topArtists={topArtists} />
            <AllArtists topArtists={topArtists} />
            <TopGenre topGenres={topGenres} />
            <AllGenres topGenres={topGenres} />
        </React.Fragment>
    )
};