function App() {
    return (
        <React.Fragment>
            {/* {<RenderNavbar />} */}
            <ReactBootstrap.Container id="wrap-description">
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
                        <ReactBootstrap.Button variant = "light" size="lg">Wrap Your History</ReactBootstrap.Button>
                    </ReactBootstrap.Col>
                    <ReactBootstrap.Col md="auto">
                        <ReactBootstrap.Button variant = "light" size ="lg">Compare Your History</ReactBootstrap.Button>
                    </ReactBootstrap.Col>
                </ReactBootstrap.Row>
            </ReactBootstrap.Container>
        </React.Fragment>
    );
}

ReactDOM.render(<App />, document.getElementById("react-app"));