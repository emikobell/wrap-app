const AllGenres = (props) => {
    return (
        <React.Fragment>
            <ReactBootstrap.Container id="all-top-genres">
                <ReactBootstrap.Row className="justify-content-center">
                    <ReactBootstrap.Col xs="auto" className="p-5">
                        <h1>Your top genres:</h1>
                    </ReactBootstrap.Col>
                </ReactBootstrap.Row>
                <ReactBootstrap.Row className="justify-content-center">
                    <ReactBootstrap.Col xs="auto">
                        <GenerateGenreGraph topGenres={props.topGenres} />
                    </ReactBootstrap.Col>
                    <ReactBootstrap.Col xs="auto">
                        <ReactBootstrap.Table borderless hover className="align-middle">
                            <tbody>
                                {props.topGenres.slice(0,10).map((genre) => {
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
                    {/* <ReactBootstrap.Col md="auto">
                        <ReactBootstrap.Table borderless hover className="align-middle">
                            <tbody>
                                {props.topGenres.slice(5,10).map((genre) => {
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
                    </ReactBootstrap.Col> */}
                </ReactBootstrap.Row>
            </ReactBootstrap.Container>
        </React.Fragment>
    )
};