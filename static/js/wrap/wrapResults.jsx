const WrapHistory = (props) => {

    const {timeframe} = props;
    const [topTracks, setTopTracks] = React.useState([]);

    React.useEffect(() => {
        const fetchTopItems =  async (timeframe) => { 
            const response = await fetch(`/wrap_history?timeframe=${timeframe}`)
            // Put error handling here
            if (response.status == 200) {
                const topTracksResponse = await fetch(`/top-tracks?timeframe=${timeframe}`);
                // Put error handling here
                const topTracksParsed = await topTracksResponse.json();
                setTopTracks(topTracksParsed);
            };
        };
        fetchTopItems(timeframe);
    }, []);

    if (topTracks.length == 0){
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
            <TopTrack topTracks={topTracks}/>
            <AllTracks topTracks={topTracks}/>
        </React.Fragment>
    )
};