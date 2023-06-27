import { Navbar, Container, Nav, Row, Col, Image } from 'react-bootstrap';

const RenderFooter = () => {
    /**
     * Render footer for page.
     */
    return (
            <footer className="align-items-center py-3 border-top">
                <Navbar className="px-4">
                    <Container>
                        <Navbar.Brand href="https://emikobell.github.io/" title="Emiko Bell's portfolio page" target="_blank">
                            <small className="text-muted mb-2 fs-6">
                                <i className="bi bi-code-slash" title="Coded"></i>
                                &nbsp; with &nbsp;
                                <i className="bi bi-heart-fill" title="love"></i>
                                &nbsp; by Emiko Bell
                            </small>
                        </Navbar.Brand>
                    </Container>
                    <Nav className="ms-auto">
                        <Nav.Item>
                            <Nav.Link href="https://github.com/emikobell/wrap-app" title="Wrap App's github repo" target="_blank">
                                <i className="bi bi-github"></i>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="https://www.linkedin.com/in/emikobell/" title="Emiko Bell's LinkedIn" target="_blank">
                                <i className="bi bi-linkedin"></i>
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Navbar>
                <Row className="justify-content-center">
                    <Col xs="auto" className="p-3">
                        <Image id="spotify-logo" alt="Spotify Logo" src="../img/spotify_logo.png" />
                    </Col>
                </Row>
            </footer>
    )
};

export default RenderFooter;