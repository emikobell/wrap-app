import { Container, Row, Col } from 'react-bootstrap';

const RenderLoading = () => {
    /**
     * Render a loading page.
     */
    return(
        <>
            <Container className="p-5">
                <Row className="justify-content-center pt-5">
                    <Col xs="auto" className="d-flex text-center p-4">
                        <h1>Wrapping your listening history...</h1>
                    </Col>
                </Row>
                <Row className="justify-content-center pb-5">
                    <Col xs="auto" className="d-flex text-center p-4">
                        <div className="loading-circle"></div>
                    </Col>
                </Row>
            </Container>
        </>
    )
};

export default RenderLoading;