import { useState } from 'react';
import CompareHistory from './compareHistory.jsx';
import RenderCompareDescription from './compareDescription.jsx';

const RenderCompare = (props) => {
    /**
     * Render page content for the comparsion feature.
     */
    const [startCompare, setStartCompare] = useState(false);
    const [timeframe1, setTimeframe1] = useState("");
    const [timeframe2, setTimeframe2] = useState("");

    const handleCompareStart = () => {
        setStartCompare(true);
    };

    return (
        <>
            {startCompare
            ? <CompareHistory timeframe1={timeframe1} timeframe2={timeframe2}
                                username={props.userInfo.display_name}
                                setStartCompare={setStartCompare} />
            : <RenderCompareDescription openSpotifyLogin={props.openSpotifyLogin}
                                        loginState={props.userInfo.login_state}
                                        handleCompareStart={handleCompareStart}
                                        setTimeframe1={setTimeframe1}
                                        setTimeframe2={setTimeframe2} />}
        </>
    )
};

export default RenderCompare;