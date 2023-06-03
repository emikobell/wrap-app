const WrapHistory = (props) => {

    const {timeframe} = props;
    const [topTracks, setTopTracks] = React.useState([]);
    const [topArtists, setTopArtists] = React.useState([]);
    const [topGenres, setTopGenres] = React.useState([]);
    const [errorState, setErrorState] = React.useState(false);

    React.useEffect(() => {
        const fetchTopItems =  async (timeframe) => { 
            const response = await fetch(`/wrap-history?timeframe=${timeframe}`);
            if (response.status !== 200) {
                setErrorState(true);
            }
        
            const topTracksResponse = await fetch(`/top-tracks?timeframe=${timeframe}`);

            if (topTracksResponse.status !== 200) {
                setErrorState(true);
            }

            const topTracksParsed = await topTracksResponse.json();
            setTopTracks(topTracksParsed);

            const topArtistsResponse = await fetch(`/top-artists?timeframe=${timeframe}`);

            if (topArtistsResponse.status !== 200) {
                setErrorState(true);
            }

            const topArtistsParsed = await topArtistsResponse.json();
            setTopArtists(topArtistsParsed);

            const topGenresResponse = await fetch(`/top-genres?timeframe=${timeframe}`);

            if (topGenresResponse.status !== 200) {
                setErrorState(true);
            }

            const topGenresParsed = await topGenresResponse.json();
            setTopGenres(topGenresParsed);
        };
        fetchTopItems(timeframe);
    }, []);

    if (errorState) {
        return <ShowError type="main" />
    } else if (topTracks.length == 0 || topArtists.length == 0 || topGenres.length == 0){
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
                    <ReactBootstrap.Col xs="auto" className="p-4">
                        <h1>Hi, {props.username}! </h1>
                        <h2>Here's your wrap history.</h2>
                    </ReactBootstrap.Col>
                </ReactBootstrap.Row>
            </ReactBootstrap.Container>
            <TopTrack topTrack={topTracks[0]} />
            <AllTracks topTracks={topTracks} title="Your top songs:" />
            <TopArtist topArtist={topArtists[0]} />
            <AllArtists topArtists={topArtists} title="Your top artists:" />
            <TopGenre topGenre={topGenres[0]} />
            <AllGenres topGenres={topGenres} />
            <GeneratePlaylist timeframe={timeframe} />
            <ReactBootstrap.Container id="wrap-again">
                <ReactBootstrap.Row className="justify-content-center">
                    <ReactBootstrap.Col xs="auto" className="p-4">
                        <ReactBootstrap.Button variant="light" size="lg" onClick={() => props.setStartWrap(false)}>
                            Wrap Again
                        </ReactBootstrap.Button>
                    </ReactBootstrap.Col>
                </ReactBootstrap.Row>
            </ReactBootstrap.Container>
        </React.Fragment>
    )
};