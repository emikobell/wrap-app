const RenderCompareForm = (props) => {
    const [choice, setChoice] = React.useState();
    const [dispTimeframe1, setDispTimeframe1] = React.useState();
    const [dispTimeframe2, setDispTimeframe2] = React.useState();
    const [buttonDisabled, setButtonDisabled] = React.useState(true);

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
    };

    const handleTimeframe2 = (eventKey) => {
        setDispTimeframe2(getTimeframeTitle(eventKey));
        props.setTimeframe2(eventKey);
        setButtonDisabled(false);
    };

    const mapOptions = (options) => {
        return (
            options.map((timeframe) => 
            <ReactBootstrap.Dropdown.Item eventKey={timeframe.key} key={timeframe.key}>
                {timeframe.name}
            </ReactBootstrap.Dropdown.Item>)
        )
    };

    const getTimeframeTitle = (eventKey) => {
        for (const timeframe of TIMEFRAMES) {
            if (timeframe.key == eventKey) {
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
        <ReactBootstrap.Container id="compare-dropdown1">
            <ReactBootstrap.Row breakpoint="md" className="justify-content-center">
                <ReactBootstrap.Col xs="auto">
                    <ReactBootstrap.Dropdown>
                        <ReactBootstrap.DropdownButton  id="timeframe1"
                                                        variant="light" size = "lg"
                                                        drop="down-centered" onSelect={(eventKey) => handleTimeframe1(eventKey)}
                                                        title={dispTimeframe1 || "Choose a Timeframe to Compare"}>
                        {mapOptions(TIMEFRAMES)}
                        </ReactBootstrap.DropdownButton>
                    </ReactBootstrap.Dropdown>
                </ReactBootstrap.Col>
                <ReactBootstrap.Col xs="auto">
                    <ReactBootstrap.Dropdown>
                        <ReactBootstrap.DropdownButton  id="timeframe2"
                                                        variant="light" size = "lg"
                                                        drop="down-centered"
                                                        title={dispTimeframe2 || "Choose a Timeframe to Compare"}
                                                        onSelect={(eventKey) => handleTimeframe2(eventKey)}>
                        {options}
                        </ReactBootstrap.DropdownButton>
                    </ReactBootstrap.Dropdown>
                </ReactBootstrap.Col>
            </ReactBootstrap.Row>
            <ReactBootstrap.Row className="justify-content-center">
                <ReactBootstrap.Col xs="auto" className="p-4">
                    <ReactBootstrap.Button variant="light" size="lg" disabled={buttonDisabled} onClick={props.handleCompareStart}>
                        Compare
                    </ReactBootstrap.Button>
                </ReactBootstrap.Col>
            </ReactBootstrap.Row>
        </ReactBootstrap.Container>
        )
};