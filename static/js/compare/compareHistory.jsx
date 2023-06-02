const CompareHistory = (props) => {

    const {timeframe1, timeframe2} = props;
    const [compareTracks, setCompareTracks] = React.useState([]);
    const [topArtists, setTopArtists] = React.useState([]);
    const [topGenres, setTopGenres] = React.useState([]);
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
        };
        fetchTopItems(timeframe1, timeframe2);
    }, []);

    if (errorState) {
        return <ShowError type="main" />
    } else if (compareTracks.length == 0) {
        return(
            <React.Fragment>
            <ReactBootstrap.Row className="justify-content-center">
                <ReactBootstrap.Col xs="auto" className="p-5">
                    <h1>Loading...</h1>
                </ReactBootstrap.Col>
            </ReactBootstrap.Row>
        </React.Fragment>
        )
    } else if (!compareTracks.top_tracks) {
        return(
            <React.Fragment>
                <ReactBootstrap.Row className="justify-content-center">
                    <ReactBootstrap.Col xs="auto" className="p-5">
                        <h1>No results :&#40;</h1>
                        <p>
                            Your Spotify profile doesn't have items to compare. This might be because your profile is too new. <br />
                            Please try again in the future after you've listened to some songs!
                        </p>
                    </ReactBootstrap.Col>
                </ReactBootstrap.Row>
            </React.Fragment>
        )
    }
    // Put else if to address empty results...including no overlap
    return (
        <React.Fragment>
            <ReactBootstrap.Container id="wrap-history-greeting">
                <ReactBootstrap.Row className="justify-content-center">
                    <ReactBootstrap.Col xs="auto" className="p-5">
                        <h1>Hi, {props.username}! </h1>
                        <h2>Here's your listening history compared.</h2>
                    </ReactBootstrap.Col>
                </ReactBootstrap.Row>
            </ReactBootstrap.Container>
            {console.log(compareTracks)}
            <ReactBootstrap.Row className="justify-content-center">
                {compareTracks.top_tracks.map((track) => {
                    return (
                        <ReactBootstrap.Col xs="auto" className="p-5">
                            <TopTrack topTrack={track} timeframeName={track.timeframe} />
                        </ReactBootstrap.Col>
                    )
                })}
                {compareTracks.similar_tracks
                ? <AllTracks topTracks={compareTracks.similar_tracks}
                                title="Here are some songs that you kept listening to:"
                                hideRank={true}/>
                : <CompareTrackText />
                }
            </ReactBootstrap.Row>
            <ReactBootstrap.Container id="wrap-again">
                <ReactBootstrap.Row className="justify-content-center">
                    <ReactBootstrap.Col xs="auto" className="p-4">
                        <ReactBootstrap.Button variant="light" size="lg" onClick={() => props.setStartCompare(false)}>
                            Compare Again
                        </ReactBootstrap.Button>
                    </ReactBootstrap.Col>
                </ReactBootstrap.Row>
            </ReactBootstrap.Container>
        </React.Fragment>
    )
};