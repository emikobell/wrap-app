const TopTrack = (props) => {
    return (
        <React.Fragment>
            <ReactBootstrap.Container id="top-song">
                <ReactBootstrap.Row className="justify-content-md-center">
                    <ReactBootstrap.Col md="auto" className="p-5">
                        <h1>Your top song:</h1>
                    </ReactBootstrap.Col>
                </ReactBootstrap.Row>
                <ReactBootstrap.Row className="justify-content-md-center">
                    <ReactBootstrap.Col md="auto">
                        <ReactBootstrap.Image src={props.topTracks[0]['img']} alt="Image of album cover" rounded />
                    </ReactBootstrap.Col>
                </ReactBootstrap.Row>
                <ReactBootstrap.Row className="justify-content-md-center">
                    <ReactBootstrap.Col md="auto">
                        <h2><a href={props.topTracks[0]['url']} target="_blank">{props.topTracks[0]['name']}</a></h2>
                    </ReactBootstrap.Col>
                </ReactBootstrap.Row>
                <ReactBootstrap.Row className="justify-content-md-center">
                    <ReactBootstrap.Col md="auto">
                        {props.topTracks[0]['artists'].map((artist) => {
                            return (
                            <React.Fragment key={artist.name}>
                                <h4><a href={artist.url} target="_blank">{artist.name}</a></h4>
                            </React.Fragment>
                            )
                        })}
                    </ReactBootstrap.Col>
                </ReactBootstrap.Row>
            </ReactBootstrap.Container>
        </React.Fragment>
    )
};
