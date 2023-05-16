function RenderNavbar(props) {

    return (<React.Fragment>
                <ReactBootstrap.Navbar expand="lg" sticky="top">
                    <ReactBootstrap.Container>
                        <ReactBootstrap.Navbar.Brand href="/">Wrap</ReactBootstrap.Navbar.Brand>
                        <ReactBootstrap.Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <ReactBootstrap.Navbar.Collapse id="basic-navbar-nav">
                            <ReactBootstrap.Nav className="ms-auto">
                                <ReactBootstrap.Nav.Link id="wrap-nav" href="/wrap">Wrap Your History</ReactBootstrap.Nav.Link>
                                <ReactBootstrap.Nav.Link id="compare-nav" href="/compare">Compare Your History</ReactBootstrap.Nav.Link>
                            </ReactBootstrap.Nav>
                        </ReactBootstrap.Navbar.Collapse>
                    </ReactBootstrap.Container>
                </ReactBootstrap.Navbar>
            </React.Fragment>
    );
};

ReactDOM.render(<RenderNavbar />, document.getElementById("nav-bar"));