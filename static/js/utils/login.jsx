const RenderLoginButton = (props) => {
    /**
     * Render login button for feature description pages.
     * This component appears under the Wrap and Compare features.
     */
    return(
        <ReactBootstrap.Container id="login-button">
            <ReactBootstrap.Row breakpoint="md" className="justify-content-center">
                <ReactBootstrap.Col xs="auto" className="p-3">
                    <ReactBootstrap.Button variant = "light" size="lg" onClick={props.openSpotifyLogin}>
                        Log In to Spotify
                    </ReactBootstrap.Button>
                </ReactBootstrap.Col>
            </ReactBootstrap.Row>
        </ReactBootstrap.Container>
    )};

    
const RenderLoginProfile = (props) => {
    /**
     * Render the user profile for the authenticated user
     * on the nav bar.
     */
    return(
        <React.Fragment>
            {props.userInfo.img_url &&
                <ReactBootstrap.Image src={props.userInfo.img_url} alt="Image of your Spotify profile"
                                      roundedCircle width="30" height="30" className="my-auto"/>}
            <ReactBootstrap.NavDropdown title={props.userInfo.display_name} id="basic-nav-dropdown">
                <ReactBootstrap.NavDropdown.Item onClick={props.handleLogOut}>Log out</ReactBootstrap.NavDropdown.Item>
            </ReactBootstrap.NavDropdown>
        </React.Fragment>
    )};


const RenderNavLogin = (props) => {
    /**
     * Render the login button on the navbar.
     */
    return(
        <React.Fragment>
            <ReactBootstrap.Nav.Link id="login-nav" onClick={props.openSpotifyLogin}>Log In</ReactBootstrap.Nav.Link>
        </React.Fragment>
    )};