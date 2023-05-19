const RenderWrap = (props) => {
    const [startWrap, setStartWrap] = React.useState(false);
    const [timeframe, setTimeframe] = React.useState("");

    const handleWrapStart = (eventKey) => {
        setTimeframe(eventKey);
        setStartWrap(true);
    };

    return (
        <React.Fragment>
            {!startWrap  && <RenderWrapDescription openSpotifyLogin={props.openSpotifyLogin} loginState={props.loginState} handleWrapStart={handleWrapStart}/>}
            {startWrap  && <WrapHistory timeframe={timeframe}/>}
        </React.Fragment>
    );
};