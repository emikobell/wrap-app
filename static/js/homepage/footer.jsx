const RenderFooter = () => {
    return (
        <ReactBootstrap.Container id="footer">
            <footer className="align-items-center py-3 my-5 border-top">
                <ReactBootstrap.Navbar>
                    <ReactBootstrap.Container>
                        <ReactBootstrap.Navbar.Brand href="#">
                            <small className="text-muted mb-2 fs-6">
                                <i className="bi bi-code-slash"></i>
                                &nbsp; with &nbsp;
                                <i className="bi bi-heart-fill"></i>
                                &nbsp; by Emiko Bell
                            </small>
                        </ReactBootstrap.Navbar.Brand>
                    </ReactBootstrap.Container>
                    <ReactBootstrap.Nav className="ms-auto">
                        <ReactBootstrap.Nav.Item>
                            <ReactBootstrap.Nav.Link href="https://github.com/emikobell/wrap-app" target="_blank">
                                <i class="bi bi-github"></i>
                            </ReactBootstrap.Nav.Link>
                        </ReactBootstrap.Nav.Item>
                        <ReactBootstrap.Nav.Item>
                            <ReactBootstrap.Nav.Link href="https://www.linkedin.com/in/emikobell/" target="_blank">
                                <i class="bi bi-linkedin"></i>
                            </ReactBootstrap.Nav.Link>
                        </ReactBootstrap.Nav.Item>
                    </ReactBootstrap.Nav>
                </ReactBootstrap.Navbar>
            </footer>
        </ReactBootstrap.Container>
    )};