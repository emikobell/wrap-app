import { Navbar, Container, Nav } from 'react-bootstrap';
import { RenderLoginProfile, RenderNavLogin } from '../utils/login.jsx';

const RenderNavbar = (props) => {
    /**
     * Render the navbar.
     */
    return (<>
                <Navbar id="top-navbar" expand="lg" sticky="top" className="py-3">
                    <Container>
                        <Navbar.Brand href="#" onClick={() => props.handlePageLocation("home")}>
                            Wrap
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="ms-auto" activeKey={props.pageLocation}>
                                <Nav.Link id="wrap-nav" eventKey="wrap" onClick={() => props.handlePageLocation("wrap")}>
                                    Wrap Your History
                                </Nav.Link>
                                <Nav.Link id="compare-nav" eventKey="compare"
                                                         onClick={() => props.handlePageLocation("compare")}
                                                         className="me-3">
                                    Compare Your History
                                </Nav.Link>
                                {props.userInfo.login_state 
                                ? <RenderLoginProfile userInfo={props.userInfo} handleLogOut={props.handleLogOut}/>
                                : <RenderNavLogin openSpotifyLogin={props.openSpotifyLogin} />}
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </>
    );
};

export default RenderNavbar;