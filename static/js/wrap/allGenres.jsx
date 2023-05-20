// Handle blank use-case

const AllGenres = (props) => {
    return (
        <React.Fragment>
            <ReactBootstrap.Container id="all-top-tracks">
                <ReactBootstrap.Row className="justify-content-md-center">
                    <ReactBootstrap.Col md="auto" className="p-5">
                        <h1>Your top genres:</h1>
                    </ReactBootstrap.Col>
                </ReactBootstrap.Row>
                <ReactBootstrap.Row className="justify-content-md-center">
                    <ReactBootstrap.Col md="auto">
                        <ReactBootstrap.Table borderless hover className="align-middle">
                            <tbody>
                                {props.topGenres.map((genre) => {
                                    return (
                                    <React.Fragment key={genre.rank}>
                                    <tr>
                                        <td><h4>{genre.name}</h4></td>
                                        <td><h2>{genre.freq}</h2></td>
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