const GenerateTrackButton = (props) => {
    return (
        <React.Fragment>
            <ReactBootstrap.Button variant="light" size="lg" onClick={props.handleTrackVisibility}>
                {props.buttonText}
            </ReactBootstrap.Button>
        </React.Fragment>
    )
};


const TopTrack = (props) => {
    return (
        <React.Fragment>
            <ReactBootstrap.Container id="top-song">
                <ReactBootstrap.Row className="justify-content-center">
                    <ReactBootstrap.Col xs="auto" className="p-5">
                        <h1>Your top song:</h1>
                    </ReactBootstrap.Col>
                </ReactBootstrap.Row>
                <ReactBootstrap.Row className="justify-content-center">
                    <ReactBootstrap.Col xs="auto">
                        <ReactBootstrap.Image src={props.topTracks[0]['img']} alt="Image of album cover" rounded />
                    </ReactBootstrap.Col>
                </ReactBootstrap.Row>
                <ReactBootstrap.Row className="justify-content-center">
                    <ReactBootstrap.Col xs="auto">
                        <h2><a href={props.topTracks[0]['url']} target="_blank">{props.topTracks[0]['name']}</a></h2>
                    </ReactBootstrap.Col>
                </ReactBootstrap.Row>
                <ReactBootstrap.Row className="justify-content-center">
                    <ReactBootstrap.Col xs="auto">
                        {props.topTracks[0]['artists'].map((artist, index) => {
                            let punct = "";
                            if (props.topTracks[0]['artists'].length > 1 && !props.topTracks[0]['artists'][index+1]) {
                                punct = " & "
                            } else if (props.topTracks[0]['artists'].length != 1 && index != 0) {
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
    const [trackVisibility, setTrackVisibility] = React.useState(false);
    const [trackNumber, setTrackNumber] = React.useState(5);
    const [buttonText, setButtonText] = React.useState("Show All 50 Songs");

    const handleTrackVisibility = () => {
        if (!trackVisibility) {
            setTrackVisibility(true);
            setTrackNumber();
            setButtonText("Hide Songs")
        } else {
            setTrackVisibility(false);
            setTrackNumber(5);
            setButtonText("Show All 50 Songs");
        }
    };

    return (
        <React.Fragment>
            <ReactBootstrap.Container id="all-top-tracks">
                <ReactBootstrap.Row className="justify-content-md-center">
                    <ReactBootstrap.Col xs="auto" className="p-5">
                        <h1>Your top songs:</h1>
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
                                        <td><h2>{track.rank}</h2></td>
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
                <ReactBootstrap.Row className="justify-content-md-center">
                    <ReactBootstrap.Col xs="auto">
                        <GenerateTrackButton handleTrackVisibility={handleTrackVisibility} buttonText={buttonText}/>
                    </ReactBootstrap.Col>
                </ReactBootstrap.Row>
            </ReactBootstrap.Container>
        </React.Fragment>
    )
};