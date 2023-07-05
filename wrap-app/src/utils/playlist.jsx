import { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { ShowError } from './error.jsx';

const GeneratePlaylist = (props) => {
    /**
     * Make a call to the server to create a Spotify playlist
     * for a given timeframe.
     */
    const [createPlaylist, setCreatePlaylist] = useState(false);
    const [playlistURL, setPlaylistURL] = useState("");

    useEffect(() => {
        const requestPlaylist = async (timeframe) => {
            const response = await fetch(`/api/playlist?timeframe=${timeframe}`);
        
            if (response.status !== 200) {
                return (
                    <ShowError type="button" />
                )
            }
            const responseParsed = await response.json();
            setPlaylistURL(responseParsed);
        };
        if (createPlaylist) {
            requestPlaylist(props.timeframe);
        }
    }, [createPlaylist]);

    return (
        <Container id="create-playlist">
            <Row className="justify-content-center">
                <Col xs="auto" className="d-flex text-center">
                    <p>
                        Want a playlist of your top 50 songs? <br />
                        Click the button below to generate a playlist on your Spotify account! 
                    </p>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col xs="auto" className="p-3">
                    {createPlaylist ? <PlaylistCreated playlistURL={playlistURL} />
                    : <PlaylistButton setCreatePlaylist={setCreatePlaylist} />}
                </Col>
            </Row>
        </Container>
    )
};

const PlaylistButton = (props) => {
    /**
     * Render a playlist creation button.
     */
    return (
        <Button variant="light" size="lg" onClick={() => props.setCreatePlaylist(true)}>
            Create Playlist on Spotify
        </Button>
    )
};

const PlaylistCreated = (props) => {
    /**
     * Render a playlist created button.
     */
    return (
        <Button href={props.playlistURL} target="_blank" rel="noopener noreferrer" variant="secondary" className="text-white" size="lg">
            Go to Playlist
        </Button>
    )
};

export default GeneratePlaylist;