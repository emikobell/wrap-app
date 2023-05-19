const RenderWrapForm = (props) => {
    return (
    <ReactBootstrap.Container id="wrap-dropdown">
        <ReactBootstrap.Row breakpoint="md" className="justify-content-md-center">
            <ReactBootstrap.Col md="auto">
                <ReactBootstrap.Dropdown>
                    <ReactBootstrap.DropdownButton id="dropdown-basic-button" variant="light" size = "lg" drop="down-centered" onSelect={props.handleWrapStart} title="Choose a Timeframe to Wrap">
                        <ReactBootstrap.Dropdown.Item eventKey="short_term">Short Term</ReactBootstrap.Dropdown.Item>
                        <ReactBootstrap.Dropdown.Item eventKey="medium_term">Medium Term</ReactBootstrap.Dropdown.Item>
                        <ReactBootstrap.Dropdown.Item eventKey="long_term">Long Term</ReactBootstrap.Dropdown.Item>
                    </ReactBootstrap.DropdownButton>
                </ReactBootstrap.Dropdown>
            </ReactBootstrap.Col>
        </ReactBootstrap.Row>
    </ReactBootstrap.Container>
    )
};