const RenderLoading = () => {
    /**
     * Render a loading page.
     */
    return(
        <React.Fragment>
            <ReactBootstrap.Row className="justify-content-center">
                <ReactBootstrap.Col xs="auto" className="p-5">
                    <h1>Loading...</h1>
                </ReactBootstrap.Col>
            </ReactBootstrap.Row>
        </React.Fragment>
    )
};