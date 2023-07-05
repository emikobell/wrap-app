import { Fragment, useState, useEffect } from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import { Chart } from 'chart.js/auto';

export const TopGenre = (props) => {
    /**
     * Render the user's top genre.
     */
    return (
        <>
            <Container id="top-genre" className="py-3 label-background">
                <Row className="justify-content-center">
                    <Col xs="auto" className="p-3">
                        <h1>Your <strong>{props.timeframeName}</strong> top genre:</h1>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col xs="auto">
                        <h2>{props.topGenre.name}</h2>
                    </Col>
                </Row>
            </Container>
        </>
    )
};


const GenerateGenreGraph = (props) => {
    /**
     * Render a donut graph of the user's top genres.
     */

    // eslint-disable-next-line
    const [graphData, setGraphData] = useState(props.topGenres);

    useEffect(() => {
        if (graphData) {
            setTimeout(() => {
                const ctx = document.getElementById("allGenres");
                const data = {
                    labels: graphData.map(genre => genre.name),
                    datasets: [{
                        data: graphData.map(genre => genre.freq),
                            }],
                    };
        
                Chart.overrides['doughnut'].plugins.legend.display = false;
        
                new Chart(ctx, {
                    type: 'doughnut',
                    data: data,
                })
            }, 1000);
        }
    }, [graphData]);

    return (
        <>
            <Col sm="6" className="px-5 mb-4 mb-sm-0">
                <canvas id="allGenres"></canvas>
            </Col>
        </>
    )
};


export const GenerateCompareGenreGraph = (props) => {
    /**
     * Render a radar graph of the user's overlapping top genres
     * across two timeframes.
     */

    // eslint-disable-next-line
    const [graphData, setGraphData] = useState(props.genreData);

    useEffect(() => {
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
                        },
                        scales: {
                            r: {
                                pointLabels: {
                                    font: {
                                        size: 15,
                                    }
                                },
                                ticks: {
                                    display: false,
                                },
                            },
                        },
                        plugins: {
                            legend: {
                                labels: {
                                    font: {
                                        size: 15,
                                    },
                                },
                            },
                        },
                      },
                })
            }, 1000);
        }
    }, [graphData]);

    return (
        <>
            <Container id="genre-compare-graph" className="label-background">
                <Row className="justify-content-center">
                    <Col xs="auto" className="p-4">
                        <h1>Here are some genres that you kept listening to:</h1>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col sm="6" className="p-sm-3">
                        <canvas id="compareGenres"></canvas>
                    </Col>
                </Row>
            </Container>
        </>
    )
};


export const AllGenres = (props) => {
    /**
     * Render a list of top genres with their frequencies.
     */
    return (
        <>
            <Container id="all-top-genres" className="py-3 label-background">
                <Row className="justify-content-center">
                    <Col xs="auto" className="p-3">
                        <h1>Your top genres:</h1>
                    </Col>
                </Row>
                <Row className="d-flex align-items-center justify-content-center p-4">
                    <GenerateGenreGraph topGenres={props.topGenres} />
                    <Col sm="3" className="px-5">
                        <Table borderless hover className="align-middle">
                            <tbody>
                                {props.topGenres.slice(0,10).map((genre) => {
                                    return (
                                    <Fragment key={genre.name}>
                                    <tr>
                                        <td><h4>{genre.name}</h4></td>
                                        <td><h2>{genre.freq}</h2></td>
                                    </tr>
                                    </Fragment>
                                )})}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </>
    )
};