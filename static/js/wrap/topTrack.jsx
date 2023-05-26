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