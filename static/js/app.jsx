let spotifyPopup

const App =() => {

    const [pageLocation, setPageLocation] = React.useState("home")

    const handlePageLocation = (location) => {
        setPageLocation(location)
    };

    const SpotifyLogin = () =>{
        spotifyPopup = window.open("/login", "test", "popup");
    };

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
    
    const RenderPageContent = (props) => {
    
        if (props.pageLocation == "wrap"){
            return <RenderWrap />
        } else if (props.pageLocation == "compare") {
            return <RenderCompare />
        } else {
            return <RenderHomeContent />
        };
    
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
        return (
            <React.Fragment>
                <ReactBootstrap.Container id="page-content">
                    <ReactBootstrap.Row className="justify-content-md-center">
                        <ReactBootstrap.Col md="auto" className="p-5">
                            <h1>
                                This is the wrap page.
                            </h1>
                        </ReactBootstrap.Col>
                    </ReactBootstrap.Row>
                </ReactBootstrap.Container>
                <ReactBootstrap.Container id="wrap-buttons">
                    <ReactBootstrap.Row breakpoint="md" className="justify-content-md-center">
                        <ReactBootstrap.Col md="auto">
                            <ReactBootstrap.Button variant = "light" size="lg" onClick={SpotifyLogin}>Login to Spotify</ReactBootstrap.Button>
                        </ReactBootstrap.Col>
                    </ReactBootstrap.Row>
                </ReactBootstrap.Container>
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
                <ReactBootstrap.Container id="wrap-buttons">
                    <ReactBootstrap.Row breakpoint="md" className="justify-content-md-center">
                        <ReactBootstrap.Col md="auto">
                            <ReactBootstrap.Button variant = "light" size="lg">Login to Spotify</ReactBootstrap.Button>
                        </ReactBootstrap.Col>
                    </ReactBootstrap.Row>
                </ReactBootstrap.Container>
            </React.Fragment>
        )
    };

    return (
        <React.Fragment>
            <RenderNavbar />
            <RenderPageContent pageLocation={pageLocation} />
        </React.Fragment>
    );
};


ReactDOM.render(<App />, document.getElementById("react-app"));