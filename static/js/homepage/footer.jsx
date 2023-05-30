const RenderFooter = () => {
    return (
        <ReactBootstrap.Container id="footer">
            <footer className="justify-content-between align-items-center py-3 my-4 border-top">
                <ReactBootstrap.Col className="align-items-center">
                    <ReactBootstrap.Nav md={4} className="justify-content-start">
                        <ReactBootstrap.Nav.Item>
                            <small className="text-muted mb-2">
                            <i className="bi bi-code-slash"></i>
                            &nbsp; with &nbsp;
                            <i className="bi bi-heart-fill"></i>
                            &nbsp; by Emiko Bell
                            </small>
                        </ReactBootstrap.Nav.Item>
                    </ReactBootstrap.Nav>
                    <ReactBootstrap.Nav md={4} className="justify-content-end">
                        <ReactBootstrap.Nav.Item>
                            <ReactBootstrap.Nav.Link href="https://github.com/emikobell/wrap-app">
                                <i class="bi bi-github"></i>
                            </ReactBootstrap.Nav.Link>
                        </ReactBootstrap.Nav.Item>
                        <ReactBootstrap.Nav.Item>
                            <ReactBootstrap.Nav.Link href="https://www.linkedin.com/in/emikobell/">
                                <i class="bi bi-linkedin"></i>
                            </ReactBootstrap.Nav.Link>
                        </ReactBootstrap.Nav.Item>
                    </ReactBootstrap.Nav>
                </ReactBootstrap.Col>
            </footer>
        </ReactBootstrap.Container>
    )};