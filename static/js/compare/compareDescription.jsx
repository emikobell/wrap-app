const RenderCompareDescription = (props) => {
    /**
     * Render the description page for the compare feature.
     */
    return (
            <React.Fragment>
                <ReactBootstrap.Container id="page-content">
                <ReactBootstrap.Row className="justify-content-center">
                    <ReactBootstrap.Col xs="auto">
                        <ReactBootstrap.Image src="/static/img/compare.png" className="img-fluid" width="500px"/>
                    </ReactBootstrap.Col>
                </ReactBootstrap.Row>
                    <ReactBootstrap.Row className="justify-content-center">
                        <ReactBootstrap.Col xs="auto" className="p-3">
                            <h1>
                                Compare your listening history.
                            </h1>
                            <p className="fs-4">
                                Compare your short, medium,
                                and long term Spotify listening history.
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
                {props.loginState && <RenderCompareForm handleCompareStart={props.handleCompareStart}
                                                        setTimeframe1={props.setTimeframe1}
                                                        setTimeframe2={props.setTimeframe2} />}
            </React.Fragment>
    )
};