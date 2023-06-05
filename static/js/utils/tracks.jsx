const GenerateTrackButton = (props) => {
    /**
     * Render a button to show more tracks or hide them.
     */
    return (
        <React.Fragment>
            <ReactBootstrap.Button variant="light" size="lg" onClick={props.handleTrackVisibility}>
                {props.buttonText}
            </ReactBootstrap.Button>
        </React.Fragment>
    )
};


const TopTrack = (props) => {
    /**
     * Render the user's top track.
     */
    return (
        <React.Fragment>
            <ReactBootstrap.Container id="top-song" className="py-3">
                <ReactBootstrap.Row className="justify-content-center">
                    <ReactBootstrap.Col xs="auto" className="p-3">
                        <h1>Your <strong>{props.timeframeName}</strong> top song:</h1>
                    </ReactBootstrap.Col>
                </ReactBootstrap.Row>
                <ReactBootstrap.Row className="justify-content-center">
                    <ReactBootstrap.Col xs="auto" className="p-4">
                        <ReactBootstrap.Image src={props.topTrack['img']} alt="Image of album cover" rounded className="img-fluid"/>
                    </ReactBootstrap.Col>
                </ReactBootstrap.Row>
                <ReactBootstrap.Row className="justify-content-center">
                    <ReactBootstrap.Col xs="auto">
                        <h2><a href={props.topTrack['url']} target="_blank">{props.topTrack['name']}</a></h2>
                    </ReactBootstrap.Col>
                </ReactBootstrap.Row>
                <ReactBootstrap.Row className="justify-content-center">
                    <ReactBootstrap.Col xs="auto">
                        {props.topTrack['artists'].map((artist, index) => {
                            let punct = "";
                            if (props.topTrack['artists'].length > 1 && !props.topTrack['artists'][index+1]) {
                                punct = " & "
                            } else if (props.topTrack['artists'].length != 1 && index != 0) {
                                punct = ", "
                            }
                            return (
                                <React.Fragment key={artist.name}>
                                    <strong>{punct}<a href={artist.url} target="_blank">{artist.name}</a></strong>
                                </React.Fragment>
                            )})}
                    </ReactBootstrap.Col>
                </ReactBootstrap.Row>
            </ReactBootstrap.Container>
        </React.Fragment>
    )
};


const AllTracks = (props) => {
    /**
     * Render the user's top tracks.
     */
    const [trackVisibility, setTrackVisibility] = React.useState(false);
    const [trackNumber, setTrackNumber] = React.useState(5);
    const [buttonText, setButtonText] = React.useState("Show More Songs");

    const handleTrackVisibility = () => {
        if (!trackVisibility) {
            setTrackVisibility(true);
            setTrackNumber();
            setButtonText("Hide Songs")
        } else {
            setTrackVisibility(false);
            setTrackNumber(5);
            setButtonText("Show More Songs");
        }
    };

    return (
        <React.Fragment>
            <ReactBootstrap.Container id="all-top-tracks" className = "py-3">
                <ReactBootstrap.Row className="justify-content-md-center">
                    <ReactBootstrap.Col xs="auto" className="p-3">
                        <h1>{props.title}</h1>
                    </ReactBootstrap.Col>
                </ReactBootstrap.Row>
                <ReactBootstrap.Row className="justify-content-md-center">
                    <ReactBootstrap.Col xs="auto">
                        <ReactBootstrap.Table borderless hover className="align-middle">
                            <tbody>
                                {props.topTracks.slice(0,trackNumber).map((track) => {
                                    return (
                                    <React.Fragment key={track.rank}>
                                    <tr>
                                        {!props.hideRank && <td><h2>{track.rank}</h2></td>}
                                        <td><ReactBootstrap.Image src={track.img} alt="Image of album cover" rounded fluid height="100px" width="100px" /></td>
                                        <td><h4><a href={track.url} target="_blank">{track.name}</a></h4>
                                            <div>
                                                {track.artists.map((artist, index) => {
                                                    let punct = "";
                                                    if (track.artists.length > 1 && !track.artists[index+1]) {
                                                        punct = " & "
                                                    } else if (track.artists.length != 1 && index != 0) {
                                                        punct = ", "
                                                    }
                                                    return (
                                                        <React.Fragment key={artist.name}>
                                                            {punct}<a href={artist.url} target="_blank">{artist.name}</a>
                                                        </React.Fragment>
                                                    )})}
                                            </div>
                                        </td>
                                    </tr>
                                    </React.Fragment>
                                )})}
                            </tbody>
                        </ReactBootstrap.Table>
                    </ReactBootstrap.Col>
                </ReactBootstrap.Row>
                <ReactBootstrap.Row className="justify-content-center">
                    <ReactBootstrap.Col xs="auto" className="p-3">
                        <GenerateTrackButton handleTrackVisibility={handleTrackVisibility} buttonText={buttonText}/>
                    </ReactBootstrap.Col>
                </ReactBootstrap.Row>
            </ReactBootstrap.Container>
        </React.Fragment>
    )
};