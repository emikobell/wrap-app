const RenderNavbar = (props) => {
    /**
     * Render the navbar.
     */
    return (<React.Fragment>
                <ReactBootstrap.Navbar id="top-navbar" expand="lg" sticky="top" className="py-3">
                    <ReactBootstrap.Container>
                        <ReactBootstrap.Navbar.Brand href="#" onClick={() => props.handlePageLocation("home")}>
                            Wrap
                        </ReactBootstrap.Navbar.Brand>
                        <ReactBootstrap.Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <ReactBootstrap.Navbar.Collapse id="basic-navbar-nav">
                            <ReactBootstrap.Nav className="ms-auto" activeKey={props.pageLocation}>
                                <ReactBootstrap.Nav.Link id="wrap-nav" eventKey="wrap" onClick={() => props.handlePageLocation("wrap")}>
                                    Wrap Your History
                                </ReactBootstrap.Nav.Link>
                                <ReactBootstrap.Nav.Link id="compare-nav" eventKey="compare"
                                                         onClick={() => props.handlePageLocation("compare")}
                                                         className="me-3">
                                    Compare Your History
                                </ReactBootstrap.Nav.Link>
                                {props.userInfo.login_state 
                                ? <RenderLoginProfile userInfo={props.userInfo} handleLogOut={props.handleLogOut}/>
                                : <RenderNavLogin openSpotifyLogin={props.openSpotifyLogin} />}
                            </ReactBootstrap.Nav>
                        </ReactBootstrap.Navbar.Collapse>
                    </ReactBootstrap.Container>
                </ReactBootstrap.Navbar>
            </React.Fragment>
    );
};