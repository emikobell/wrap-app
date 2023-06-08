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
        return <RenderLoading />
    } else if (!topTracks[0] || !topArtists[0] || !topGenres[0]) {
        return <ShowNoItems text="top items" />
    }

    return (
        <React.Fragment>
            <ReactBootstrap.Container className="pop-to-front">
                <ReactBootstrap.Row className="justify-content-center">
                    <ReactBootstrap.Col xs="auto">
                        <h1>Hi, {props.username}! </h1>
                        <h2>Here's your wrap history.</h2>
                    </ReactBootstrap.Col>
                </ReactBootstrap.Row>
            </ReactBootstrap.Container>
            <ReactBootstrap.Container className="pop-from-bottom">
                <ReactBootstrap.Row className="d-flex align-items-center p-4">
                    <ReactBootstrap.Col>
                        <TopTrack topTrack={topTracks[0]} />
                    </ReactBootstrap.Col>
                    <ReactBootstrap.Col>
                        <AllTracks topTracks={topTracks} title="Your top songs:" />
                    </ReactBootstrap.Col>
                </ReactBootstrap.Row>
                <ReactBootstrap.Row className="d-flex align-items-center p-4">
                    <ReactBootstrap.Col className="order-md-2">
                        <TopArtist topArtist={topArtists[0]} />
                    </ReactBootstrap.Col>
                    <ReactBootstrap.Col className="order-md-1">
                        <AllArtists topArtists={topArtists} title="Your top artists:" />
                    </ReactBootstrap.Col>
                </ReactBootstrap.Row>
                <TopGenre topGenre={topGenres[0]} />
                <AllGenres topGenres={topGenres} />
                <GeneratePlaylist timeframe={timeframe} />
                <ReactBootstrap.Container id="wrap-again">
                    <ReactBootstrap.Row className="justify-content-center">
                        <ReactBootstrap.Col xs="auto" className="p-3">
                            <ReactBootstrap.Button variant="light" size="lg" onClick={() => props.setStartWrap(false)}>
                                Wrap Again
                            </ReactBootstrap.Button>
                        </ReactBootstrap.Col>
                    </ReactBootstrap.Row>
                </ReactBootstrap.Container>
            </ReactBootstrap.Container>
        </React.Fragment>
    )
};