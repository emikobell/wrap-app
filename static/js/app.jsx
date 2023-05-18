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

const App = () => {

    const [pageLocation, setPageLocation] = React.useState("home")
    const [popupState, setPopupState] = React.useState(null);
    const [loginState, setLoginState] = React.useState(false);
    const [startWrap, setStartWrap] = React.useState(false);
    const [timeframe, setTimeframe] = React.useState("");

    const handlePageLocation = (location) => {
        setPageLocation(location)
    };

    const handleWrapStart = (eventKey) => {
        setTimeframe(eventKey);
        setStartWrap(true);
    };

    const openSpotifyLogin = () => {
        setPopupState(window.open("/login", "", "popup"));
    };

    React.useEffect(() => {
        if (!popupState) {
          return;
        }
        const timer = setInterval(() => {
          if (!popupState) {
            timer && clearInterval(timer);
            return;
          }
          const currentUrl = popupState.location.href;
          if (!currentUrl) {
            return;
          }
          const {searchParams} = new URL(currentUrl);
          const code = searchParams.get('code');
          if (code) {
            popupState.close();
            setLoginState(true);
            setPopupState(null);
            timer && clearInterval(timer);
          }
        }, 500)
      },
      [popupState]
    );

    const RenderLoginButton = () => {
        return(
            <ReactBootstrap.Container id="login-button">
                <ReactBootstrap.Row breakpoint="md" className="justify-content-md-center">
                    <ReactBootstrap.Col md="auto">
                        <ReactBootstrap.Button variant = "light" size="lg" onClick={openSpotifyLogin}>Login to Spotify</ReactBootstrap.Button>
                    </ReactBootstrap.Col>
                </ReactBootstrap.Row>
            </ReactBootstrap.Container>
        )};

    const RenderNavbar = (props) => {
    
        return (<React.Fragment>
                    <ReactBootstrap.Navbar expand="lg" sticky="top">
                        <ReactBootstrap.Container>
                            <ReactBootstrap.Navbar.Brand href="#" onClick={() => handlePageLocation("home")}>Wrap</ReactBootstrap.Navbar.Brand>
                            <ReactBootstrap.Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <ReactBootstrap.Navbar.Collapse id="basic-navbar-nav">
                                <ReactBootstrap.Nav className="ms-auto" activeKey={pageLocation}>
                                    <ReactBootstrap.Nav.Link id="wrap-nav" eventKey="wrap" onClick={() => handlePageLocation("wrap")}>Wrap Your History</ReactBootstrap.Nav.Link>
                                    <ReactBootstrap.Nav.Link id="compare-nav" eventKey="compare" onClick={() => handlePageLocation("compare")}>Compare Your History</ReactBootstrap.Nav.Link>
                                </ReactBootstrap.Nav>
                            </ReactBootstrap.Navbar.Collapse>
                        </ReactBootstrap.Container>
                    </ReactBootstrap.Navbar>
                </React.Fragment>
        );
    };
    

    const RenderHomeContent = () => {
        return(
            <React.Fragment>
                <ReactBootstrap.Container id="page-content">
                    <ReactBootstrap.Row className="justify-content-md-center">
                        <ReactBootstrap.Col md="auto" className="p-5">
                            <h1>
                                Wrap your Spotify<br/>
                                history every day of the year.
                            </h1>
                            <p className="fs-4">
                                See your top tracks, artists, and genres at any time.
                            </p>
                        </ReactBootstrap.Col>
                    </ReactBootstrap.Row>
                </ReactBootstrap.Container>
                <ReactBootstrap.Container id="wrap-buttons">
                    <ReactBootstrap.Row breakpoint="md" className="justify-content-md-center">
                        <ReactBootstrap.Col md="auto">
                            <ReactBootstrap.Button variant = "light" size="lg" onClick={() => handlePageLocation("wrap")}>Wrap Your History</ReactBootstrap.Button>
                        </ReactBootstrap.Col>
                        <ReactBootstrap.Col md="auto">
                            <ReactBootstrap.Button variant = "light" size ="lg" onClick={() => handlePageLocation("compare")}>Compare Your History</ReactBootstrap.Button>
                        </ReactBootstrap.Col>
                    </ReactBootstrap.Row>
                </ReactBootstrap.Container>
            </React.Fragment>
        );
    };
    

    const RenderWrap = () => {

        const RenderWrapForm = () => {
            return (
            <ReactBootstrap.Container id="wrap-dropdown">
                <ReactBootstrap.Row breakpoint="md" className="justify-content-md-center">
                    <ReactBootstrap.Col md="auto">
                        <ReactBootstrap.Dropdown>
                            <ReactBootstrap.DropdownButton id="dropdown-basic-button" variant="light" size = "lg" drop="down-centered" onSelect={handleWrapStart} title="Choose a Timeframe to Wrap">
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


        const RenderWrapDescription = () => {
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
                    {!loginState && <RenderLoginButton />}
                    {loginState && <RenderWrapForm />}
                </React.Fragment>
            )
        };

        return (
            <React.Fragment>
                {!startWrap  && <RenderWrapDescription />}
                {startWrap  && <WrapHistory timeframe={timeframe}/>}
            </React.Fragment>
        );
    };
    

    const RenderCompare = () => {
        return (
            <React.Fragment>
                <ReactBootstrap.Container id="page-content">
                    <ReactBootstrap.Row className="justify-content-md-center">
                        <ReactBootstrap.Col md="auto" className="p-5">
                            <h1>
                                This is the compare page.
                            </h1>
                        </ReactBootstrap.Col>
                    </ReactBootstrap.Row>
                </ReactBootstrap.Container>
                <RenderLoginButton />
            </React.Fragment>
        )
    };


    const RenderPageContent = (props) => {
    
        if (props.pageLocation == "wrap"){
            return <RenderWrap />
        } else if (props.pageLocation == "compare") {
            return <RenderCompare />
        } else {
            return <RenderHomeContent />
        };
    };

    return (
        <React.Fragment>
            <RenderNavbar />
            <RenderPageContent pageLocation={pageLocation} />
        </React.Fragment>
    );
};


ReactDOM.render(<App />, document.getElementById("react-app"));