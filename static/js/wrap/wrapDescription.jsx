const RenderWrapDescription = (props) => {
    /**
     * Render the description page for the wrap feature.
     */
    return (
        <React.Fragment>
            <ReactBootstrap.Container id="page-content">
                <ReactBootstrap.Row className="justify-content-center">
                    <ReactBootstrap.Col xs="auto">
                        <ReactBootstrap.Image src="/static/img/wrap2.png" className="img-fluid" width="700px"/>
                    </ReactBootstrap.Col>
                </ReactBootstrap.Row>
                <ReactBootstrap.Row className="justify-content-center">
                    <ReactBootstrap.Col xs="auto" className="p-3">
                        <h1>
                            Wrap your listening history.
                        </h1>
                        <p className="fs-4">
                            Wrap your short, medium, and long term
                            Spotify listening history. <br />
                            You can also choose to generate a playlist of your top songs!
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
            {props.loginState && <RenderWrapForm handleWrapStart={props.handleWrapStart}/>}
        </React.Fragment>
    )
};