// Handle blank use-case

const TopGenre = (props) => {
    return (
        <React.Fragment>
            <ReactBootstrap.Container id="top-artist">
                <ReactBootstrap.Row className="justify-content-md-center">
                    <ReactBootstrap.Col md="auto" className="p-5">
                        <h1>Your top genre:</h1>
                    </ReactBootstrap.Col>
                </ReactBootstrap.Row>
                <ReactBootstrap.Row className="justify-content-md-center">
                    <ReactBootstrap.Col md="auto">
                        <h2>{props.topGenres[0].name}</h2>
                    </ReactBootstrap.Col>
                </ReactBootstrap.Row>
            </ReactBootstrap.Container>
        </React.Fragment>
    )
};