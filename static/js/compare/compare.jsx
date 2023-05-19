const RenderCompare = (props) => {
    const [startCompare, setStartCompare] = React.useState(false);
    const [timeframe1, setTimeframe1] = React.useState("");
    const [timeframe2, setTimeframe2] = React.useState("");

    return (
        <React.Fragment>
            <ReactBootstrap.Container id="page-content">
                <ReactBootstrap.Row className="justify-content-md-center">
                    <ReactBootstrap.Col md="auto" className="p-5">
                        <h1>
                            This is the compare page.
                        </h1>
                    </ReactBootstrap.Col>
                </ReactBootstrap.Row>
            </ReactBootstrap.Container>
            <RenderLoginButton openSpotifyLogin={props.openSpotifyLogin}/>
        </React.Fragment>
    )
};