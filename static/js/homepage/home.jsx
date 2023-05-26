const RenderHomeContent = (props) => {
    return(
        <React.Fragment>
            <ReactBootstrap.Container id="page-content">
                <ReactBootstrap.Row className="justify-content-center">
                    <ReactBootstrap.Col xs="auto" className="p-5">
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
                <ReactBootstrap.Row breakpoint="md" className="justify-content-center">
                    <ReactBootstrap.Col xs="auto">
                        <ReactBootstrap.Button variant = "light" size="lg" onClick={() => props.handlePageLocation("wrap")}>Wrap Your History</ReactBootstrap.Button>
                    </ReactBootstrap.Col>
                    <ReactBootstrap.Col xs="auto">
                        <ReactBootstrap.Button variant = "light" size ="lg" onClick={() => props.handlePageLocation("compare")}>Compare Your History</ReactBootstrap.Button>
                    </ReactBootstrap.Col>
                </ReactBootstrap.Row>
            </ReactBootstrap.Container>
        </React.Fragment>
    );
};