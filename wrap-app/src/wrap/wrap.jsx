import { useState } from 'react';
import WrapHistory from './wrapHistory.jsx'
import RenderWrapDescription from './wrapDescription.jsx';

const RenderWrap = (props) => {
    /**
     * Render page content for the wrap feature.
     */
    const [startWrap, setStartWrap] = useState(false);
    const [timeframe, setTimeframe] = useState("");

    const handleWrapStart = (eventKey) => {
        setTimeframe(eventKey);
        setStartWrap(true);
    };

    return (
        <>
            {startWrap 
            ? <WrapHistory timeframe={timeframe} username={props.userInfo.display_name}
                            setStartWrap={setStartWrap} /> 
            : <RenderWrapDescription openSpotifyLogin={props.openSpotifyLogin}
                                     loginState={props.userInfo.login_state}
                                     handleWrapStart={handleWrapStart}/>}
        </>
    );
};

export default RenderWrap;