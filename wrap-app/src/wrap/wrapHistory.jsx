import { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { ShowError, ShowNoItems } from '../utils/error.jsx';
import RenderLoading from '../utils/loading.jsx';
import { TopTrack, AllTracks } from '../utils/tracks.jsx';
import { TopArtist, AllArtists } from '../utils/artists.jsx';
import { TopGenre, AllGenres } from '../utils/genres.jsx';
import GeneratePlaylist from '../utils/playlist.jsx';

const WrapHistory = (props) => {

    const { timeframe } = props;
    const [topTracks, setTopTracks] = useState([]);
    const [topArtists, setTopArtists] = useState([]);
    const [topGenres, setTopGenres] = useState([]);
    const [errorState, setErrorState] = useState(false);

    useEffect(() => {
        const fetchTopItems =  async (timeframe) => { 
            const response = await fetch(`/wrap-history?timeframe=${timeframe}`);
            if (response.status !== 200) {
                setErrorState(true);
            }
        
            const topTracksResponse = await fetch(`/top-tracks?timeframe=${timeframe}`);

            if (topTracksResponse.status !== 200) {
                setErrorState(true);
            }

            const topTracksParsed = await topTracksResponse.json();
            setTopTracks(topTracksParsed);

            const topArtistsResponse = await fetch(`/top-artists?timeframe=${timeframe}`);

            if (topArtistsResponse.status !== 200) {
                setErrorState(true);
            }

            const topArtistsParsed = await topArtistsResponse.json();
            setTopArtists(topArtistsParsed);

            const topGenresResponse = await fetch(`/top-genres?timeframe=${timeframe}`);

            if (topGenresResponse.status !== 200) {
                setErrorState(true);
            }

            const topGenresParsed = await topGenresResponse.json();
            setTopGenres(topGenresParsed);
        };
        fetchTopItems(timeframe);
    }, []);

    if (errorState) {
        return <ShowError type="main" />
    } else if (topTracks.length === 0 || topArtists.length === 0 || topGenres.length === 0){
        return <RenderLoading />
    } else if (!topTracks[0] || !topArtists[0] || !topGenres[0]) {
        return <ShowNoItems text="top items" />
    }

    return (
        <>
            <Container className="pop-to-front">
                <Row className="justify-content-center">
                    <Col xs="auto">
                        <h1>Hi, {props.username}! </h1>
                        <h2>Here's your wrap history.</h2>
                    </Col>
                </Row>
            </Container>
            <Container className="pop-from-bottom">
                <Row className="d-flex align-items-center p-4">
                    <Col>
                        <TopTrack topTrack={topTracks[0]} />
                    </Col>
                    <Col>
                        <AllTracks topTracks={topTracks} title="Your top songs:" />
                    </Col>
                </Row>
                <Row className="d-flex align-items-center p-4">
                    <Col className="order-md-2">
                        <TopArtist topArtist={topArtists[0]} />
                    </Col>
                    <Col className="order-md-1">
                        <AllArtists topArtists={topArtists} title="Your top artists:" />
                    </Col>
                </Row>
                <TopGenre topGenre={topGenres[0]} />
                <AllGenres topGenres={topGenres} />
                <GeneratePlaylist timeframe={timeframe} />
                <Container id="wrap-again">
                    <Row className="justify-content-center">
                        <Col xs="auto" className="p-3">
                            <Button variant="light" size="lg" onClick={() => props.setStartWrap(false)}>
                                Wrap Again
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </Container>
        </>
    )
};

export default WrapHistory;