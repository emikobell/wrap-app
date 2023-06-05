const RenderWrap = (props) => {
    /**
     * Render page content for the wrap feature.
     */
    const [startWrap, setStartWrap] = React.useState(false);
    const [timeframe, setTimeframe] = React.useState("");

    const handleWrapStart = (eventKey) => {
        setTimeframe(eventKey);
        setStartWrap(true);
    };

    return (
        <React.Fragment>
            {startWrap 
            ? <WrapHistory timeframe={timeframe} username={props.userInfo.display_name}
                            setStartWrap={setStartWrap} /> 
            : <RenderWrapDescription openSpotifyLogin={props.openSpotifyLogin}
                                     loginState={props.userInfo.login_state}
                                     handleWrapStart={handleWrapStart}/>}
        </React.Fragment>
    );
};