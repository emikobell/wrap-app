const RenderWrapForm = (props) => {
    return (
    <ReactBootstrap.Container id="wrap-dropdown">
        <ReactBootstrap.Row breakpoint="md" className="justify-content-center">
            <ReactBootstrap.Col xs="auto">
                <ReactBootstrap.Dropdown>
                    <ReactBootstrap.DropdownButton  className={"d-grid"} id="dropdown-basic-button"
                                                    variant="light" size = "lg"
                                                    drop="down-centered" onSelect={props.handleWrapStart}
                                                    title="Choose a Timeframe to Wrap">
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