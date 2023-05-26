const GenerateTrackButton = (props) => {
    return (
        <React.Fragment>
            <ReactBootstrap.Button variant="light" size="lg" onClick={props.handleTrackVisibility}>
                {props.buttonText}
            </ReactBootstrap.Button>
        </React.Fragment>
    )
};