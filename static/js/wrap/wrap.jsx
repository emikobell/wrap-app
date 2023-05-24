const RenderWrap = (props) => {
    const [startWrap, setStartWrap] = React.useState(false);
    const [timeframe, setTimeframe] = React.useState("");

    const handleWrapStart = (eventKey) => {
        setTimeframe(eventKey);
        setStartWrap(true);
    };

    return (
        <React.Fragment>
            {startWrap 
            ? <WrapHistory timeframe={timeframe}/> 
            : <RenderWrapDescription openSpotifyLogin={props.openSpotifyLogin}
                                        loginState={props.loginState}
                                        handleWrapStart={handleWrapStart}/>}
        </React.Fragment>
    );
};