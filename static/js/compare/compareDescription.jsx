const RenderCompareDescription = (props) => {
    /**
     * Render the description page for the compare feature.
     */
    return (
            <React.Fragment>
                <ReactBootstrap.Container id="page-content">
                    <ReactBootstrap.Row className="justify-content-center pb-4 pop-to-front">
                        <ReactBootstrap.Col xs="auto">
                            <ReactBootstrap.Image src="/static/img/compare.png" alt="Image of two overlapping circles" className="img-fluid" width="500px"/>
                        </ReactBootstrap.Col>
                    </ReactBootstrap.Row>
                    <ReactBootstrap.Row className="justify-content-center pop-from-bottom">
                        <ReactBootstrap.Col xs="auto" className="p-3">
                            <h1>
                                Compare your listening history.
                            </h1>
                            <p className="fs-4">
                                Compare your short, medium,
                                and long term Spotify listening history.
                            </p>
                            <ul className="fs-4">
                                <li><strong>Short term:</strong> Last month</li>
                                <li><strong>Medium term:</strong> Last six months</li>
                                <li><strong>Long term:</strong> Last several years</li>
                            </ul>
                        </ReactBootstrap.Col>
                    </ReactBootstrap.Row>
                </ReactBootstrap.Container>
                {!props.loginState && <RenderLoginButton openSpotifyLogin={props.openSpotifyLogin}/>}
                {props.loginState && <RenderCompareForm handleCompareStart={props.handleCompareStart}
                                                        setTimeframe1={props.setTimeframe1}
                                                        setTimeframe2={props.setTimeframe2} />}
            </React.Fragment>
    )
};