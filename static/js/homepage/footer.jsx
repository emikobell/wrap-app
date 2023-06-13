const RenderFooter = () => {
    /**
     * Render footer for page.
     */
    return (
        // <ReactBootstrap.Container id="footer">
            <footer className="align-items-center py-3 border-top">
                <ReactBootstrap.Navbar className="px-4">
                    <ReactBootstrap.Container>
                        <ReactBootstrap.Navbar.Brand href="https://emikobell.github.io/" target="_blank">
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
                                <i className="bi bi-github"></i>
                            </ReactBootstrap.Nav.Link>
                        </ReactBootstrap.Nav.Item>
                        <ReactBootstrap.Nav.Item>
                            <ReactBootstrap.Nav.Link href="https://www.linkedin.com/in/emikobell/" target="_blank">
                                <i className="bi bi-linkedin"></i>
                            </ReactBootstrap.Nav.Link>
                        </ReactBootstrap.Nav.Item>
                    </ReactBootstrap.Nav>
                </ReactBootstrap.Navbar>
                <ReactBootstrap.Row className="justify-content-center">
                    <ReactBootstrap.Col xs="auto" className="p-3">
                        <ReactBootstrap.Image id="spotify-logo" src="/static/img/spotify_logo.png" />
                    </ReactBootstrap.Col>
                </ReactBootstrap.Row>
            </footer>
        // </ReactBootstrap.Container>
    )};