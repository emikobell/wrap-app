const ShowError = (props) => {
    /**
     * Render error messages.
     */
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
                        There was an error. Please reload the page and try again. <br />
                        <br />
                        <strong>NOTE:</strong> This app is pending approval from Spotify. Only registered users on the dev console can log in and use the app. <br />
                        Once approval is granted, all Spotify users can authenticate and use the app!
                    </p>
                </ReactBootstrap.Col>
            </ReactBootstrap.Row>
        </React.Fragment>
    )
};

const ShowNoItems = (props) => {
    /**
     * Render message that no top items were associated with
     * the Spotify account.
     */
    return (
        <React.Fragment>
            <ReactBootstrap.Row className="justify-content-center">
                <ReactBootstrap.Col xs="auto" className="p-5">
                    <h1>No results :&#40;</h1>
                    <p>
                        Your Spotify profile doesn't have {props.text}. This might be because your profile is too new. <br />
                        Please try again in the future after you've listened to some songs!
                    </p>
                </ReactBootstrap.Col>
            </ReactBootstrap.Row>
        </React.Fragment>
    )
};