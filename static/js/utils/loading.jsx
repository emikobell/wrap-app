const RenderLoading = () => {
    /**
     * Render a loading page.
     */
    return(
        <React.Fragment>
            <ReactBootstrap.Row className="justify-content-center p-5">
                <ReactBootstrap.Col xs="auto" className="p-5">
                    <h1>Loading...</h1>
                </ReactBootstrap.Col>
            </ReactBootstrap.Row>
        </React.Fragment>
    )
};