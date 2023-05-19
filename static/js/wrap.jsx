const RenderWrapForm = (props) => {
    return (
    <ReactBootstrap.Container id="wrap-dropdown">
        <ReactBootstrap.Row breakpoint="md" className="justify-content-md-center">
            <ReactBootstrap.Col md="auto">
                <ReactBootstrap.Dropdown>
                    <ReactBootstrap.DropdownButton id="dropdown-basic-button" variant="light" size = "lg" drop="down-centered" onSelect={props.handleWrapStart} title="Choose a Timeframe to Wrap">
                        <ReactBootstrap.Dropdown.Item eventKey="short_term">Short Term</ReactBootstrap.Dropdown.Item>
                        <ReactBootstrap.Dropdown.Item eventKey="medium_term">Medium Term</ReactBootstrap.Dropdown.Item>
                        <ReactBootstrap.Dropdown.Item eventKey="long_term">Long Term</ReactBootstrap.Dropdown.Item>
                    </ReactBootstrap.DropdownButton>
                </ReactBootstrap.Dropdown>
            </ReactBootstrap.Col>
        </ReactBootstrap.Row>
    </ReactBootstrap.Container>
    )
};

const RenderWrapDescription = (props) => {
    return (
        <React.Fragment>
            <ReactBootstrap.Container id="page-content">
                <ReactBootstrap.Row className="justify-content-md-center">
                    <ReactBootstrap.Col md="auto" className="p-5">
                        <h1>
                            This is the wrap page.
                        </h1>
                        <p className="fs-4">
                            Choose between short term, medium term, and long term
                            to wrap your history.
                        </p>
                        <ul className="fs-4">
                            <li>Short term: Last month</li>
                            <li>Medium term: Last six months</li>
                            <li>Long term: Last several years</li>
                        </ul>
                    </ReactBootstrap.Col>
                </ReactBootstrap.Row>
            </ReactBootstrap.Container>
            {!props.loginState && <RenderLoginButton openSpotifyLogin={props.openSpotifyLogin}/>}
            {props.loginState && <RenderWrapForm handleWrapStart={props.handleWrapStart}/>}
        </React.Fragment>
    )
};

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

    const TopTrack = (props) => {

        return(
            <React.Fragment>
                <ReactBootstrap.Container id="top-song">
                    <ReactBootstrap.Row className="justify-content-md-center">
                        <ReactBootstrap.Col md="auto" className="p-5">
                            <h1>Your top song:</h1>
                        </ReactBootstrap.Col>
                    </ReactBootstrap.Row>
                    <ReactBootstrap.Row className="justify-content-md-center">
                        <ReactBootstrap.Col md="auto">
                            <img src={props.topTracks[0]['img']} alt="Image of album cover" />
                        </ReactBootstrap.Col>
                    </ReactBootstrap.Row>
                    <ReactBootstrap.Row className="justify-content-md-center">
                        <ReactBootstrap.Col md="auto">
                            <h2><a href={props.topTracks[0]['url']} target="_blank">{props.topTracks[0]['name']}</a></h2>
                        </ReactBootstrap.Col>
                    </ReactBootstrap.Row>
                    <ReactBootstrap.Row className="justify-content-md-center">
                        <ReactBootstrap.Col md="auto">
                            {}
                        </ReactBootstrap.Col>
                    </ReactBootstrap.Row>
                </ReactBootstrap.Container>
            </React.Fragment>
        )
    }; 

    if (topTracks.length == 0){
        return <p>Loading...</p>
    }

    return <TopTrack topTracks={topTracks}/>
    
};

const RenderWrap = (props) => {
    const [startWrap, setStartWrap] = React.useState(false);
    const [timeframe, setTimeframe] = React.useState("");

    const handleWrapStart = (eventKey) => {
        setTimeframe(eventKey);
        setStartWrap(true);
    };

    return (
        <React.Fragment>
            {!startWrap  && <RenderWrapDescription openSpotifyLogin={props.openSpotifyLogin} loginState={props.loginState} handleWrapStart={handleWrapStart}/>}
            {startWrap  && <WrapHistory timeframe={timeframe}/>}
        </React.Fragment>
    );
};