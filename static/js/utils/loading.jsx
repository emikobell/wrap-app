const RenderLoading = () => {
    /**
     * Render a loading page.
     */
    return(
        <React.Fragment>
            <ReactBootstrap.Container className="p-5">
                <ReactBootstrap.Row className="justify-content-center pt-5">
                    <ReactBootstrap.Col xs="auto" className="d-flex text-center p-4">
                        <h1>Wrapping your listening history...</h1>
                    </ReactBootstrap.Col>
                </ReactBootstrap.Row>
                <ReactBootstrap.Row className="justify-content-center pb-5">
                    <ReactBootstrap.Col xs="auto" className="d-flex text-center p-4">
                        <div className="loading-circle"></div>
                    </ReactBootstrap.Col>
                </ReactBootstrap.Row>
            </ReactBootstrap.Container>
        </React.Fragment>
    )
};