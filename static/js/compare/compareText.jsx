const CompareText = (props) => {
    return(
        <ReactBootstrap.Container id="compare-text">
            <ReactBootstrap.Row className="justify-content-md-center">
                <ReactBootstrap.Col xs="auto" className="p-5">
                    <h1>It looks like you don't have any {props.text} that overlap.</h1>
                    <p>Your listening history is pretty diverse!</p>
                </ReactBootstrap.Col>
            </ReactBootstrap.Row>
        </ReactBootstrap.Container>
    )
};