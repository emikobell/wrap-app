const ShowError = (props) => {
    if (props.type == 'button') {
        return (
            <ReactBootstrap.Container id="error">
                <ReactBootstrap.Row className="justify-content-center">
                    <ReactBootstrap.Col xs="auto" className="p-4">
                        <ReactBootstrap.Button variant="light" size="lg" disabled>
                            Error :&#40;
                        </ReactBootstrap.Button>
                    </ReactBootstrap.Col>
                </ReactBootstrap.Row>
            </ReactBootstrap.Container>
        )
    }
    return (
        <React.Fragment>
            <ReactBootstrap.Row className="justify-content-center">
                <ReactBootstrap.Col xs="auto" className="p-5">
                    <h1>Error :&#40;</h1>
                    <p>
                        There was an error. Please reload the page and try again.
                    </p>
                </ReactBootstrap.Col>
            </ReactBootstrap.Row>
        </React.Fragment>
    )
};