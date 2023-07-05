import { Container, Row, Col, Dropdown, DropdownButton } from 'react-bootstrap';

const RenderWrapForm = (props) => {
    /**
     * Render the form for listening history wrap feature.
     */
    return (
    <Container id="wrap-dropdown" className="wrap-content pop-from-bottom">
        <Row breakpoint="md" className="justify-content-center">
            <Col xs="auto" className="p-3">
                <Dropdown>
                    <DropdownButton  id="dropdown-basic-button"
                                        variant="light" size = "lg"
                                        drop="down-centered" onSelect={props.handleWrapStart}
                                        title="Choose a Timeframe">
                        <Dropdown.Item eventKey="short_term">Short Term</Dropdown.Item>
                        <Dropdown.Item eventKey="medium_term">Medium Term</Dropdown.Item>
                        <Dropdown.Item eventKey="long_term">Long Term</Dropdown.Item>
                    </DropdownButton>
                </Dropdown>
            </Col>
        </Row>
    </Container>
    )
};

export default RenderWrapForm;