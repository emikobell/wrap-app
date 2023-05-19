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