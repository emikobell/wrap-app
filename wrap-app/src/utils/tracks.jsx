import { Button, Container, Row, Col, Image, Table } from 'react-bootstrap';
import { Fragment, useState } from 'react';

const GenerateTrackButton = (props) => {
    /**
     * Render a button to show more tracks or hide them.
     */
    return (
        <>
            <Button variant="light" size="lg" onClick={props.handleTrackVisibility}>
                {props.buttonText}
            </Button>
        </>
    )
};


export const TopTrack = (props) => {
    /**
     * Render the user's top track.
     */
    return (
        <>
            <Container id="top-track" className="py-3 label-background">
                <Row className="justify-content-center">
                    <Col xs="auto" className="p-3">
                        <h1>Your <strong>{props.timeframeName}</strong> top song:</h1>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col xs="auto" className="p-4">
                        <a href={props.topTrack['url']} target="_blank" rel="noopener noreferrer">
                            <Image src={props.topTrack['img']} alt="Image of album cover" className="img-fluid"/>
                        </a>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col xs="auto">
                        <h2><a href={props.topTrack['url']} target="_blank" rel="noopener noreferrer">{props.topTrack['name']}</a></h2>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col xs="auto">
                        <p className="fs-5">
                        {props.topTrack['artists'].map((artist, index) => {
                            let punct = "";
                            if (props.topTrack['artists'].length > 1 && !props.topTrack['artists'][index+1]) {
                                punct = " & "
                            } else if (props.topTrack['artists'].length !== 1 && index !== 0) {
                                punct = ", "
                            }
                            return (
                                <Fragment key={artist.name}>
                                    {punct}<a href={artist.url} target="_blank" rel="noopener noreferrer">{artist.name}</a>
                                </Fragment>
                            )})}
                        </p>
                    </Col>
                </Row>
            </Container>
        </>
    )
};


export const AllTracks = (props) => {
    /**
     * Render the user's top tracks.
     */
    const [trackVisibility, setTrackVisibility] = useState(false);
    const [trackNumber, setTrackNumber] = useState(5);
    const [buttonText, setButtonText] = useState("Show More Songs");

    const handleTrackVisibility = () => {
        if (!trackVisibility) {
            setTrackVisibility(true);
            setTrackNumber();
            setButtonText("Hide Songs")
        } else {
            setTrackVisibility(false);
            setTrackNumber(5);
            setButtonText("Show More Songs");
        }
    };

    return (
        <>
            <Container id="all-top-tracks" className = "py-3 label-background">
                <Row className="justify-content-center">
                    <Col xs="auto" className="p-3">
                        <h1>{props.title}</h1>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col xs="auto">
                        <Table borderless hover className="align-middle">
                            <tbody>
                                {props.topTracks.slice(0,trackNumber).map((track) => {
                                    return (
                                    <Fragment key={track.rank}>
                                    <tr>
                                        {!props.hideRank && <td><h2>{track.rank}</h2></td>}
                                        <td>
                                            <a href={track.url} target="_blank" rel="noopener noreferrer">
                                                <Image src={track.img} alt="Image of album cover" fluid height="100px" width="100px" />
                                            </a>
                                        </td>
                                        <td>
                                            <h4><a href={track.url} target="_blank" rel="noopener noreferrer">{track.name}</a></h4>
                                            <div>
                                                <p className="fs-5">
                                                {track.artists.map((artist, index) => {
                                                    let punct = "";
                                                    if (track.artists.length > 1 && !track.artists[index+1]) {
                                                        punct = " & "
                                                    } else if (track.artists.length !== 1 && index !== 0) {
                                                        punct = ", "
                                                    }
                                                    return (
                                                        <Fragment key={artist.name}>
                                                            {punct}<a href={artist.url} target="_blank" rel="noopener noreferrer">{artist.name}</a>
                                                        </Fragment>
                                                    )})}
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                    </Fragment>
                                )})}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col xs="auto" className="p-3">
                        <GenerateTrackButton handleTrackVisibility={handleTrackVisibility} buttonText={buttonText}/>
                    </Col>
                </Row>
            </Container>
        </>
    )
};
