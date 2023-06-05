const RenderCompare = (props) => {
    /**
     * Render page content for the comparsion feature.
     */
    const [startCompare, setStartCompare] = React.useState(false);
    const [timeframe1, setTimeframe1] = React.useState("");
    const [timeframe2, setTimeframe2] = React.useState("");

    const handleCompareStart = () => {
        setStartCompare(true);
    };

    return (
        <React.Fragment>
            {startCompare
            ? <CompareHistory timeframe1={timeframe1} timeframe2={timeframe2}
                                username={props.userInfo.display_name}
                                setStartCompare={setStartCompare} />
            : <RenderCompareDescription openSpotifyLogin={props.openSpotifyLogin}
                                        loginState={props.userInfo.login_state}
                                        handleCompareStart={handleCompareStart}
                                        setTimeframe1={setTimeframe1}
                                        setTimeframe2={setTimeframe2} />}
        </React.Fragment>
    )
};