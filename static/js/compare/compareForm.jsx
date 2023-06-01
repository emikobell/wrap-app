const RenderCompareForm = (props) => {
    const [choice, setChoice] = React.useState();

    const timeframes = [
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
        props.setTimeframe1(choice);
    };

    const handleTimeframe2 = (eventKey) => {
        props.setTimeframe2(eventKey);
    };

    const mapOptions = (options) => {
        return (
            options.map((timeframe) => 
            <ReactBootstrap.Dropdown.Item eventKey={timeframe.key} key={timeframe.key}>
                {timeframe.name}
            </ReactBootstrap.Dropdown.Item>)
        )
    };

    let options = null;

    if (choice) {
        const filteredOptions = timeframes.filter(timeframe => timeframe.key !== choice);
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
                                                        title="Choose a Timeframe to Compare">
                        {mapOptions(timeframes)}
                        </ReactBootstrap.DropdownButton>
                    </ReactBootstrap.Dropdown>
                </ReactBootstrap.Col>
                <ReactBootstrap.Col xs="auto">
                    <ReactBootstrap.Dropdown>
                        <ReactBootstrap.DropdownButton  id="timeframe2"
                                                        variant="light" size = "lg"
                                                        drop="down-centered"
                                                        title="Choose a Timeframe to Compare"
                                                        onSelect={(eventKey) => handleTimeframe2(eventKey)}>
                        {options}
                        </ReactBootstrap.DropdownButton>
                    </ReactBootstrap.Dropdown>
                </ReactBootstrap.Col>
            </ReactBootstrap.Row>
            <ReactBootstrap.Row className="justify-content-center">
                <ReactBootstrap.Col xs="auto" className="p-4">
                    <ReactBootstrap.Button variant="light" size="lg" onSelect={props.handleCompareStart}>
                        Compare
                    </ReactBootstrap.Button>
                </ReactBootstrap.Col>
            </ReactBootstrap.Row>
        </ReactBootstrap.Container>
        )
};