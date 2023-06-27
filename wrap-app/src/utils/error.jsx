import { Container, Row, Col, Button } from 'react-bootstrap';

export const ShowError = (props) => {
    /**
     * Render error messages.
     */
    if (props.type === 'button') {
        return (
            <Container id="error">
                <Row className="justify-content-center">
                    <Col xs="auto" className="p-4">
                        <Button variant="light" size="lg" disabled>
                            Error :&#40;
                        </Button>
                    </Col>
                </Row>
            </Container>
        )
    }
    
    return (
        <>
            <Row className="justify-content-center">
                <Col xs="auto" className="p-5">
                    <h1>Error :&#40;</h1>
                    <p>
                        There was an error. Please reload the page and try again. <br />
                    </p>
                </Col>
            </Row>
        </>
    )
};

export const ShowNoItems = (props) => {
    /**
     * Render message that no top items were associated with
     * the Spotify account.
     */
    return (
        <>
            <Row className="justify-content-center">
                <Col xs="auto" className="p-5">
                    <h1>No results :&#40;</h1>
                    <p>
                        Your Spotify profile doesn't have {props.text}. This might be because your profile is too new. <br />
                        Please try again in the future after you've listened to some songs!
                    </p>
                </Col>
            </Row>
        </>
    )
};