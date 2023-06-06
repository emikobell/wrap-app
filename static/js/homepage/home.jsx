const RenderHomeContent = (props) => {
    /**
     * Render the landing page content.
     */
    return(
        <React.Fragment>
            <ReactBootstrap.Container id="page-content">
                <ReactBootstrap.Row className="justify-content-center">
                    <ReactBootstrap.Col xs="auto" className="py-3">
                        <ReactBootstrap.Image src="/static/img/wrap1.png" alt="Image of three overlapping lines and two sets of two overlapping circles" className="img-fluid" width="1000px"/>
                    </ReactBootstrap.Col>
                </ReactBootstrap.Row>
                <ReactBootstrap.Row className="justify-content-center">
                    <ReactBootstrap.Col xs="auto" className="p-3">
                        <h1>
                            Wrap your Spotify<br/>
                            history every day of the year.
                        </h1>
                        <p className="fs-4">
                            See your top tracks, artists, and genres at any time. <br />
                            You can choose to wrap your listening history within a specific timeframe, <br />
                            or compare your listening history over time.
                        </p>
                    </ReactBootstrap.Col>
                </ReactBootstrap.Row>
            </ReactBootstrap.Container>
            <ReactBootstrap.Container id="wrap-buttons">
                <ReactBootstrap.Row breakpoint="md" className="justify-content-center">
                    <ReactBootstrap.Col xs="auto" className= "p-3">
                        <ReactBootstrap.Button variant = "light" size="lg" onClick={() => props.handlePageLocation("wrap")}>Wrap Your History</ReactBootstrap.Button>
                    </ReactBootstrap.Col>
                    <ReactBootstrap.Col xs="auto" className="p-3">
                        <ReactBootstrap.Button variant = "light" size ="lg" onClick={() => props.handlePageLocation("compare")}>Compare Your History</ReactBootstrap.Button>
                    </ReactBootstrap.Col>
                </ReactBootstrap.Row>
            </ReactBootstrap.Container>
        </React.Fragment>
    );
};