const AllTracks = (props) => {
    return (
        <React.Fragment>
            <ReactBootstrap.Container id="all-top-tracks">
                <ReactBootstrap.Row className="justify-content-md-center">
                    <ReactBootstrap.Col md="auto" className="p-5">
                        <h1>Your top songs:</h1>
                    </ReactBootstrap.Col>
                </ReactBootstrap.Row>
                <ReactBootstrap.Row className="justify-content-md-center">
                    <ReactBootstrap.Col md="auto">
                        <ReactBootstrap.Table borderless hover className="align-middle">
                            <tbody>
                                {props.topTracks.map((track) => {
                                    return (
                                    <React.Fragment key={track.rank}>
                                    <tr>
                                        <td>{track.rank}</td>
                                        <td><ReactBootstrap.Image src={track.img} alt="Image of album cover" rounded fluid /></td>
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
            </ReactBootstrap.Container>
        </React.Fragment>
    )
};