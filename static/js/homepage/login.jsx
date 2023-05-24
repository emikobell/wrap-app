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

const RenderLoginProfile = (props) => {
    return(
        <React.Fragment>
            <ReactBootstrap.NavDropdown title={props.userInfo.display_name} id="basic-nav-dropdown">
                {/* <img src={props.userInfo.img_url} alt="Image of your Spotify profile" /> */}
                <ReactBootstrap.NavDropdown.Item onClick={props.handleLogOut}>Log out</ReactBootstrap.NavDropdown.Item>
            </ReactBootstrap.NavDropdown>
        </React.Fragment>
    )};


const RenderNavLogin = (props) => {
    return(
        <React.Fragment>
            <ReactBootstrap.Nav.Link id="login-nav" onClick={props.openSpotifyLogin}>Log In</ReactBootstrap.Nav.Link>
        </React.Fragment>
    )};