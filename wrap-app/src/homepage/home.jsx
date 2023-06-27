import { Container, Row, Col, Image, Button } from 'react-bootstrap';

const RenderHomeContent = (props) => {
    /**
     * Render the landing page content.
     */
    return(
        <>
            <Container id="page-content">
                <Row className="justify-content-center">
                    <Col xs="auto" className="py-3 pop-to-front">
                        <Image src="../img/wrap1.png" alt="Image of three overlapping lines and two sets of two overlapping circles" className="img-fluid" width="1000px"/>
                    </Col>
                </Row>
                <Row className="justify-content-center pop-from-bottom">
                    <Col xs="auto" className="p-3">
                        <h1>
                            Wrap your Spotify<br/>
                            history every day of the year.
                        </h1>
                        <p className="fs-4">
                            See your top tracks, artists, and genres at any time. <br />
                            You can choose to wrap your listening history within a specific timeframe, <br />
                            or compare your listening history over time.
                        </p>
                    </Col>
                </Row>
            </Container>
            <Container id="wrap-buttons" className="pop-from-bottom">
                <Row breakpoint="md" className="justify-content-center">
                    <Col xs="auto" className= "p-3">
                        <Button variant = "light" size="lg" onClick={() => props.handlePageLocation("wrap")}>Wrap Your History</Button>
                    </Col>
                    <Col xs="auto" className="p-3">
                        <Button variant = "light" size ="lg" onClick={() => props.handlePageLocation("compare")}>Compare Your History</Button>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default RenderHomeContent;