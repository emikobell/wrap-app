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
            <ReactBootstrap.Row className="justify-content-md-center">
                <ReactBootstrap.Col md="auto" className="p-5">
                    <h1>Loading...</h1>
                </ReactBootstrap.Col>
            </ReactBootstrap.Row>
        </React.Fragment>
        )
    }

    return (
        <React.Fragment>
            <TopTrack topTracks={topTracks} />
            <AllTracks topTracks={topTracks} />
            <TopArtist topArtists={topArtists} />
            <AllArtists topArtists={topArtists} />
            <TopGenre topGenres={topGenres} />
            <AllGenres topGenres={topGenres} />
        </React.Fragment>
    )
};