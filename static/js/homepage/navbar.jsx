const RenderNavbar = (props) => {
    
    return (<React.Fragment>
                <ReactBootstrap.Navbar expand="lg" sticky="top">
                    <ReactBootstrap.Container>
                        <ReactBootstrap.Navbar.Brand href="#" onClick={() => props.handlePageLocation("home")}>Wrap</ReactBootstrap.Navbar.Brand>
                        <ReactBootstrap.Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <ReactBootstrap.Navbar.Collapse id="basic-navbar-nav">
                            <ReactBootstrap.Nav className="ms-auto" activeKey={props.pageLocation}>
                                <ReactBootstrap.Nav.Link id="wrap-nav" eventKey="wrap" onClick={() => props.handlePageLocation("wrap")}>Wrap Your History</ReactBootstrap.Nav.Link>
                                <ReactBootstrap.Nav.Link id="compare-nav" eventKey="compare" onClick={() => props.handlePageLocation("compare")}>Compare Your History</ReactBootstrap.Nav.Link>
                            </ReactBootstrap.Nav>
                        </ReactBootstrap.Navbar.Collapse>
                    </ReactBootstrap.Container>
                </ReactBootstrap.Navbar>
            </React.Fragment>
    );
};