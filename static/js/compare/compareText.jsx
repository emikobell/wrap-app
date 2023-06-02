const CompareTrackText = () => {
    return(
        <ReactBootstrap.Container id="all-top-tracks">
            <ReactBootstrap.Row className="justify-content-md-center">
                <ReactBootstrap.Col xs="auto" className="p-5">
                    <h1>It looks like you don't have any songs that overlap.</h1>
                    <p>Your listening history is pretty diverse!</p>
                </ReactBootstrap.Col>
            </ReactBootstrap.Row>
        </ReactBootstrap.Container>
    )
}