import { Button, Container, Row, Col, Image, Table} from 'react-bootstrap';
import { Fragment, useState } from 'react';

const GenerateArtistButton = (props) => {
    /**
     * Render a button to show more artists or hide them.
     */
    return (
        <>
            <Button variant="light" size="lg" onClick={props.handleArtistVisibility}>
                {props.buttonText}
            </Button>
        </>
    )
};


export const TopArtist = (props) => {
    /**
     * Render the user's top artist.
     */
    return (
        <>
            <Container id="top-artist" className="py-3 label-background">
                <Row className="justify-content-center">
                    <Col xs="auto" className="p-3">
                        <h1>Your <strong>{props.timeframeName}</strong> top artist:</h1>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col xs="auto" className="p-4">
                        <a href={props.topArtist['url']} title={props.topArtist['name'] + " Spotify link"} target="_blank">
                            <Image src={props.topArtist['img']} alt={"Image of album cover for " + props.topArtist['name']} className="img-fluid" />
                        </a>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col xs="auto">
                        <h2><a href={props.topArtist['url']} target="_blank">{props.topArtist['name']}</a></h2>
                    </Col>
                </Row>
            </Container>
        </>
    )
};


export const AllArtists = (props) => {
    /**
     * Render the user's top artists.
     */
    const [artistVisibility, setArtistVisibility] = useState(false);
    const [artistNumber, setArtistNumber] = useState(5);
    const [buttonText, setButtonText] = useState("Show More Artists");

    const handleArtistVisibility = () => {
        if (!artistVisibility) {
            setArtistVisibility(true);
            setArtistNumber();
            setButtonText("Hide Artists")
        } else {
            setArtistVisibility(false);
            setArtistNumber(5);
            setButtonText("Show More Artists");
        }
    };
    
    return (
        <>
            <Container id="all-top-artists" className="py-3 label-background">
                <Row className="justify-content-center">
                    <Col xs="auto" className="p-3">
                        <h1>{props.title}</h1>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col xs="auto">
                        <Table borderless hover className="align-middle">
                            <tbody>
                                {props.topArtists.slice(0,artistNumber).map((artist) => {
                                    return (
                                    <Fragment key={artist.rank}>
                                    <tr>
                                        {!props.hideRank && <td><h2>{artist.rank}</h2></td>}
                                        <td>
                                            <a href={artist.url} target="_blank">
                                                <Image src={artist.img} alt={"Image of artist, " + artist.name} fluid height="100px" width="100px" />
                                            </a>
                                        </td>
                                        <td>
                                            <h4><a href={artist.url} target="_blank">{artist.name}</a></h4>
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
                        <GenerateArtistButton handleArtistVisibility={handleArtistVisibility} buttonText={buttonText}/>
                    </Col>
                </Row>
            </Container>
        </>
    )
};