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
                    <ReactBootstrap.Col md="auto">
                        <canvas id="allGenres"></canvas>
                    </ReactBootstrap.Col>
            </ReactBootstrap.Container>
        </React.Fragment>
    )
};