const RenderWrapDescription = (props) => {
    return (
        <React.Fragment>
            <ReactBootstrap.Container id="page-content">
                <ReactBootstrap.Row className="justify-content-center">
                    <ReactBootstrap.Col xs="auto" className="p-5">
                        <h1>
                            Wrap your listening history.
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