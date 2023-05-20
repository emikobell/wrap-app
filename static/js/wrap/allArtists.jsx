const AllArtists = (props) => {
    return (
        <React.Fragment>
            <ReactBootstrap.Container id="all-top-tracks">
                <ReactBootstrap.Row className="justify-content-md-center">
                    <ReactBootstrap.Col md="auto" className="p-5">
                        <h1>Your top artists:</h1>
                    </ReactBootstrap.Col>
                </ReactBootstrap.Row>
                <ReactBootstrap.Row className="justify-content-md-center">
                    <ReactBootstrap.Col md="auto">
                        <ReactBootstrap.Table borderless hover className="align-middle">
                            <tbody>
                                {props.topArtists.map((artist) => {
                                    return (
                                    <React.Fragment key={artist.rank}>
                                    <tr>
                                        <td><h2>{artist.rank}</h2></td>
                                        <td><ReactBootstrap.Image src={artist.img} alt="Image of artist, {artist.name}" rounded fluid /></td>
                                        <td><h4><a href={artist.url} target="_blank">{artist.name}</a></h4></td>
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