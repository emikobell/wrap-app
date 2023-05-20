const RenderLoginButton = (props) => {
    return(
        <ReactBootstrap.Container id="login-button">
            <ReactBootstrap.Row breakpoint="md" className="justify-content-md-center">
                <ReactBootstrap.Col md="auto">
                    <ReactBootstrap.Button variant = "light" size="lg" onClick={props.openSpotifyLogin}>
                        Log In on Spotify
                    </ReactBootstrap.Button>
                </ReactBootstrap.Col>
            </ReactBootstrap.Row>
        </ReactBootstrap.Container>
    )};