const CompareHistory = (props) => {
    /**
     * Fetch listening history comparison data from
     * the server and render results.
     */

    const {timeframe1, timeframe2} = props;
    const [compareTracks, setCompareTracks] = React.useState([]);
    const [compareArtists, setCompareArtists] = React.useState([]);
    const [compareGenres, setCompareGenres] = React.useState([]);
    const [errorState, setErrorState] = React.useState(false);

    React.useEffect(() => {
        const fetchTopItems = async (timeframe1, timeframe2) => {
            const timeframe1Response = await fetch(`/wrap-history?timeframe=${timeframe1}`);
            if (timeframe1Response.status !== 200) {
                setErrorState(true);
            }

            const timeframe2Response = await fetch(`/wrap-history?timeframe=${timeframe2}`);
            if (timeframe2Response.status !== 200) {
                setErrorState(true);
            }

            const compareTracksResponse = await fetch(`/compare-tracks?timeframe1=${timeframe1}&timeframe2=${timeframe2}`);
            if (compareTracksResponse.status !== 200) {
                setErrorState(true);
            }

            const compareTracksParsed = await compareTracksResponse.json();
            setCompareTracks(compareTracksParsed);

            const compareArtistsResponse = await fetch(`/compare-artists?timeframe1=${timeframe1}&timeframe2=${timeframe2}`);
            if (compareTracksResponse.status !== 200) {
                setErrorState(true);
            }

            const compareArtistsParsed = await compareArtistsResponse.json();
            setCompareArtists(compareArtistsParsed);
            
            const compareGenresResponse = await fetch(`/compare-genres?timeframe1=${timeframe1}&timeframe2=${timeframe2}`);
            if (compareGenresResponse.status !== 200) {
                setErrorState(true);
            }

            const compareGenresParsed = await compareGenresResponse.json();
            setCompareGenres(compareGenresParsed);
        };
        fetchTopItems(timeframe1, timeframe2);
    }, []);

    if (errorState) {
        return <ShowError type="main" />
    } else if (compareTracks.length == 0 || compareArtists.length == 0 || compareGenres.length == 0) {
        return <RenderLoading />
    } else if (!compareTracks.top_tracks || !compareArtists.top_artists || !compareGenres.top_genres) {
        return <ShowNoItems text="items to compare" />
    }

    return (
        <React.Fragment>
            <ReactBootstrap.Container id="wrap-history-greeting">
                <ReactBootstrap.Row className="justify-content-center">
                    <ReactBootstrap.Col xs="auto">
                        <h1>Hi, {props.username}! </h1>
                        <h2>Here's your listening history compared.</h2>
                    </ReactBootstrap.Col>
                </ReactBootstrap.Row>
            </ReactBootstrap.Container>
            <ReactBootstrap.Row className="justify-content-center">
                {compareTracks.top_tracks.map((track) => {
                    return (
                        <ReactBootstrap.Col xs="auto" className="p-sm-5" key={track.timeframe}>
                            <TopTrack topTrack={track} timeframeName={track.timeframe} />
                        </ReactBootstrap.Col>
                    )
                })}
                {compareTracks.similar_tracks
                ? <AllTracks topTracks={compareTracks.similar_tracks}
                                title="Here are some songs that you kept listening to:"
                                hideRank={true}/>
                : <CompareText text="songs"/>
                }
            </ReactBootstrap.Row>
            <ReactBootstrap.Row className="justify-content-center">
                {compareArtists.top_artists.map((artist) => {
                    return (
                        <ReactBootstrap.Col xs="auto" className="p-sm-5" key={artist.timeframe}>
                            <TopArtist topArtist={artist} timeframeName={artist.timeframe} />
                        </ReactBootstrap.Col>
                    )
                })}
                {compareArtists.similar_artists
                ? <AllArtists topArtists={compareArtists.similar_artists}
                                title="Here are some artists that you kept listening to:"
                                hideRank={true}/>
                : <CompareText text="artists" />
                }
            </ReactBootstrap.Row>
            <ReactBootstrap.Row className="justify-content-center">
                {compareGenres.top_genres.map((genre) => {
                    return (
                        <ReactBootstrap.Col xs="auto" className="p-sm-5" key={genre.timeframe}>
                            <TopGenre topGenre={genre} timeframeName={genre.timeframe} />
                        </ReactBootstrap.Col>
                    )
                })}
                {compareGenres.genre_data
                ? <GenerateCompareGenreGraph genreData={compareGenres.genre_data} />
                : <CompareText text="genres" />}
            </ReactBootstrap.Row>
            <ReactBootstrap.Container id="compare-again">
                <ReactBootstrap.Row className="justify-content-center">
                    <ReactBootstrap.Col xs="auto" className="p-3">
                        <ReactBootstrap.Button variant="light" size="lg" onClick={() => props.setStartCompare(false)}>
                            Compare Again
                        </ReactBootstrap.Button>
                    </ReactBootstrap.Col>
                </ReactBootstrap.Row>
            </ReactBootstrap.Container>
        </React.Fragment>
    )
};