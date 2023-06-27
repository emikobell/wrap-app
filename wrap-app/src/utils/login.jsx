import { Container, Row, Col, Button, Image, Nav, NavDropdown } from 'react-bootstrap';

export const RenderLoginButton = (props) => {
    /**
     * Render login button for feature description pages.
     * This component appears under the Wrap and Compare features.
     */
    return(
        <Container id="login-button" className="pop-from-bottom">
            <Row breakpoint="md" className="justify-content-center">
                <Col xs="auto" className="p-3">
                    <Button variant = "light" size="lg" onClick={props.openSpotifyLogin}>
                        Log In to Spotify
                    </Button>
                </Col>
            </Row>
        </Container>
    )};

    
export const RenderLoginProfile = (props) => {
    /**
     * Render the user profile for the authenticated user
     * on the nav bar.
     */
    return(
        <>
            {props.userInfo.img_url &&
                <Image src={props.userInfo.img_url} alt="Image of your Spotify profile"
                                      roundedCircle width="30" height="30" className="my-auto"/>}
            <NavDropdown title={props.userInfo.display_name} id="basic-nav-dropdown">
                <NavDropdown.Item href="https://www.spotify.com/account/apps/" target="_blank">Disconnect</NavDropdown.Item>
                <NavDropdown.Item onClick={props.handleLogOut}>Log out</NavDropdown.Item>
            </NavDropdown>
        </>
    )};


export const RenderNavLogin = (props) => {
    /**
     * Render the login button on the navbar.
     */
    return(
        <>
            <Nav.Link id="login-nav" onClick={props.openSpotifyLogin}>Log In</Nav.Link>
        </>
    )};