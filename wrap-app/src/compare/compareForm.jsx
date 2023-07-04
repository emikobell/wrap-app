import { useState } from 'react';
import { Dropdown, DropdownButton, Button, Container, Row, Col } from 'react-bootstrap';

const RenderCompareForm = (props) => {
    /**
     * Render the form for listening history comparison feature.
     */

    const [choice, setChoice] = useState();
    const [choice2, setChoice2] = useState();
    const [dispTimeframe1, setDispTimeframe1] = useState();
    const [dispTimeframe2, setDispTimeframe2] = useState();
    const [buttonDisabled, setButtonDisabled] = useState(true);

    const TIMEFRAMES = [
        {
            key: 'short_term',
            name: 'Short Term',
        },
        {
            key: 'medium_term',
            name: 'Medium Term',

        },
        {
            key: 'long_term',
            name: 'Long Term',
        },
    ];

    const handleTimeframe1 = (eventKey) => {
        setChoice(eventKey);
        setDispTimeframe1(getTimeframeTitle(eventKey));
        props.setTimeframe1(eventKey);

        if (eventKey === choice2) {
            setButtonDisabled(true);
        } else if (choice2 && buttonDisabled === true) {
            setButtonDisabled(false);
        }
    };

    const handleTimeframe2 = (eventKey) => {
        setDispTimeframe2(getTimeframeTitle(eventKey));
        props.setTimeframe2(eventKey);
        setChoice2(eventKey);
        setButtonDisabled(false);
    };

    const mapOptions = (options) => {
        return (
            options.map((timeframe) => 
            <Dropdown.Item eventKey={timeframe.key} key={timeframe.key}>
                {timeframe.name}
            </Dropdown.Item>)
        )
    };

    const getTimeframeTitle = (eventKey) => {
        for (const timeframe of TIMEFRAMES) {
            if (timeframe.key === eventKey) {
                return timeframe.name;
            }
        }
    };

    let options = null;

    if (choice) {
        const filteredOptions = TIMEFRAMES.filter(timeframe => timeframe.key !== choice);
        options = mapOptions(filteredOptions);
    }

    return (
        <Container className="pop-from-bottom">
            <Row breakpoint="md" className="justify-content-center">
                <Col xs="auto" className="p-3">
                    <Dropdown>
                        <DropdownButton  id="timeframe1"
                                            variant="light" size = "lg"
                                            drop="down-centered" onSelect={(eventKey) => handleTimeframe1(eventKey)}
                                            title={dispTimeframe1 || "Choose a Timeframe"}>
                        {mapOptions(TIMEFRAMES)}
                        </DropdownButton>
                    </Dropdown>
                </Col>
                <Col xs="auto" className="p-3">
                    <Dropdown>
                        <DropdownButton  id="timeframe2"
                                            variant="light" size = "lg"
                                            drop="down-centered"
                                            title={dispTimeframe2 || "Choose a Timeframe"}
                                            onSelect={(eventKey) => handleTimeframe2(eventKey)}>
                        {options}
                        </DropdownButton>
                    </Dropdown>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col xs="auto" className="p-3">
                    <Button variant="light" size="lg" disabled={buttonDisabled} onClick={props.handleCompareStart}>
                        Compare
                    </Button>
                </Col>
            </Row>
        </Container>
        )
};

export default RenderCompareForm;