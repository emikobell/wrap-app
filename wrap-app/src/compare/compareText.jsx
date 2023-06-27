import { Container, Row, Col } from 'react-bootstrap';

const CompareText = (props) => {
    return(
        <Container id="compare-text">
            <Row className="justify-content-md-center">
                <Col xs="auto" className="p-5">
                    <h1>It looks like you don't have any {props.text} that overlap.</h1>
                    <p>Your listening history is pretty diverse!</p>
                </Col>
            </Row>
        </Container>
    )
};

export default CompareText;