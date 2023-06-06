const TopGenre = (props) => {
    /**
     * Render the user's top genre.
     */
    return (
        <React.Fragment>
            <ReactBootstrap.Container id="top-artist" className="py-3">
                <ReactBootstrap.Row className="justify-content-center">
                    <ReactBootstrap.Col xs="auto" className="p-3">
                        <h1>Your <strong>{props.timeframeName}</strong> top genre:</h1>
                    </ReactBootstrap.Col>
                </ReactBootstrap.Row>
                <ReactBootstrap.Row className="justify-content-center">
                    <ReactBootstrap.Col xs="auto">
                        <h2>{props.topGenre.name}</h2>
                    </ReactBootstrap.Col>
                </ReactBootstrap.Row>
            </ReactBootstrap.Container>
        </React.Fragment>
    )
};


const GenerateGenreGraph = (props) => {
    /**
     * Render a donut graph of the user's top genres.
     */
    const [graphData, setGraphData] = React.useState(props.topGenres);

    React.useEffect(() => {
        if (graphData) {
            setTimeout(() => {
                const ctx = document.getElementById("allGenres");
                const data = {
                    labels: graphData.map(genre => genre.name),
                    datasets: [{
                        data: graphData.map(genre => genre.freq),
                            }]
                    };
        
                Chart.overrides['doughnut'].plugins.legend.display = false;
        
                new Chart(ctx, {
                    type: 'doughnut',
                    data: data,
                })
            }, 1000);
        }
    }, []);

    return (
        <React.Fragment>
                    <ReactBootstrap.Col sm="6" className="px-5 mb-4 mb-sm-0">
                        <canvas id="allGenres"></canvas>
                    </ReactBootstrap.Col>
        </React.Fragment>
    )
};


const GenerateCompareGenreGraph = (props) => {
    /**
     * Render a radar graph of the user's overlapping top genres
     * across two timeframes.
     */
    const [graphData, setGraphData] = React.useState(props.genreData);

    React.useEffect(() => {
        if (graphData) {
            setTimeout(() => {
                const ctx = document.getElementById("compareGenres");
                
                new Chart(ctx, {
                    type: 'radar',
                    data: graphData,
                    options: {
                        normalized: true,
                        elements: {
                          line: {
                            borderWidth: 3
                          }
                        }
                      },
                })
            }, 1000);
        }
    }, []);

    return (
        <React.Fragment>
            <ReactBootstrap.Container id="genre-compare-graph">
                <ReactBootstrap.Row className="justify-content-center">
                    <ReactBootstrap.Col xs="auto" className="p-4">
                        <h1>Here are some genres that you kept listening to:</h1>
                    </ReactBootstrap.Col>
                </ReactBootstrap.Row>
                <ReactBootstrap.Row className="justify-content-center">
                    <ReactBootstrap.Col xs="auto" className="p-sm-3">
                        <canvas id="compareGenres"></canvas>
                    </ReactBootstrap.Col>
                </ReactBootstrap.Row>
            </ReactBootstrap.Container>
        </React.Fragment>
    )
};


const AllGenres = (props) => {
    /**
     * Render a list of top genres with their frequencies.
     */
    return (
        <React.Fragment>
            <ReactBootstrap.Container id="all-top-genres" className="py-3">
                <ReactBootstrap.Row className="justify-content-center">
                    <ReactBootstrap.Col xs="auto" className="p-3">
                        <h1>Your top genres:</h1>
                    </ReactBootstrap.Col>
                </ReactBootstrap.Row>
                <ReactBootstrap.Row className="d-flex align-items-center justify-content-center p-4">
                    <GenerateGenreGraph topGenres={props.topGenres} />
                    <ReactBootstrap.Col sm="3" className="px-5">
                        <ReactBootstrap.Table borderless hover className="align-middle">
                            <tbody>
                                {props.topGenres.slice(0,10).map((genre) => {
                                    return (
                                    <React.Fragment key={genre.name}>
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