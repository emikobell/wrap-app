const TopGenre = (props) => {
    return (
        <React.Fragment>
            <ReactBootstrap.Container id="top-artist">
                <ReactBootstrap.Row className="justify-content-center">
                    <ReactBootstrap.Col xs="auto" className="p-5">
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
            <ReactBootstrap.Container id="genre-graph">
                    <ReactBootstrap.Col xs="auto" className="p-5">
                        <canvas id="allGenres"></canvas>
                    </ReactBootstrap.Col>
            </ReactBootstrap.Container>
        </React.Fragment>
    )
};


const GenerateCompareGenreGraph = (props) => {
    const [graphData, setGraphData] = React.useState(props.genreData);

    React.useEffect(() => {
        if (graphData) {
            setTimeout(() => {
                const ctx = document.getElementById("compareGenres");
                console.log(graphData)
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
                    <ReactBootstrap.Col xs="auto" className="p-5">
                        <h1>Here are some genres that you kept listening to:</h1>
                        <canvas id="compareGenres"></canvas>
                    </ReactBootstrap.Col>
                </ReactBootstrap.Row>
            </ReactBootstrap.Container>
        </React.Fragment>
    )
};


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
                    <GenerateGenreGraph topGenres={props.topGenres} />
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
                </ReactBootstrap.Row>
            </ReactBootstrap.Container>
        </React.Fragment>
    )
};