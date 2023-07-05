import { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { ShowError, ShowNoItems } from '../utils/error.jsx';
import RenderLoading from '../utils/loading.jsx';
import { TopTrack, AllTracks } from '../utils/tracks.jsx';
import CompareText from './compareText.jsx';
import { TopArtist, AllArtists } from '../utils/artists.jsx';
import { TopGenre, GenerateCompareGenreGraph } from '../utils/genres.jsx';

const CompareHistory = (props) => {
    /**
     * Fetch listening history comparison data from
     * the server and render results.
     */

    const { timeframe1, timeframe2 } = props;
    const [compareTracks, setCompareTracks] = useState([]);
    const [compareArtists, setCompareArtists] = useState([]);
    const [compareGenres, setCompareGenres] = useState([]);
    const [errorState, setErrorState] = useState(false);

    useEffect(() => {
        const fetchTopItems = async (timeframe1, timeframe2) => {

            const timeframe1Response = await fetch(`/api/wrap-history?timeframe=${timeframe1}`);
            if (timeframe1Response.status !== 200) {
                setErrorState(true);
            }

            const timeframe2Response = await fetch(`/api/wrap-history?timeframe=${timeframe2}`);
            if (timeframe2Response.status !== 200) {
                setErrorState(true);
            }

            const compareTracksResponse = await fetch(`/api/compare-tracks?timeframe1=${timeframe1}&timeframe2=${timeframe2}`);
            if (compareTracksResponse.status !== 200) {
                setErrorState(true);
            }

            const compareTracksParsed = await compareTracksResponse.json();
            setCompareTracks(compareTracksParsed);

            const compareArtistsResponse = await fetch(`/api/compare-artists?timeframe1=${timeframe1}&timeframe2=${timeframe2}`);
            if (compareTracksResponse.status !== 200) {
                setErrorState(true);
            }

            const compareArtistsParsed = await compareArtistsResponse.json();
            setCompareArtists(compareArtistsParsed);
            
            const compareGenresResponse = await fetch(`/api/compare-genres?timeframe1=${timeframe1}&timeframe2=${timeframe2}`);
            if (compareGenresResponse.status !== 200) {
                setErrorState(true);
            }

            const compareGenresParsed = await compareGenresResponse.json();
            setCompareGenres(compareGenresParsed);
        };

        if (!timeframe1 || !timeframe2) {
            return;
        }
        
        fetchTopItems(timeframe1, timeframe2);
    }, [timeframe1, timeframe2]);

    if (errorState) {
        return <ShowError type="main" />
    } else if (compareTracks.length === 0 || compareArtists.length === 0 || compareGenres.length === 0) {
        return <RenderLoading />
    } else if (!compareTracks.top_tracks || !compareArtists.top_artists || !compareGenres.top_genres) {
        console.log(compareTracks);
        return <ShowNoItems text="items to compare" />
    }

    return (
        <>
            <Container className="pop-to-front">
                <Row className="justify-content-center">
                    <Col xs="auto">
                        <h1>Hi, {props.username}! </h1>
                        <h2>Here's your listening history compared.</h2>
                    </Col>
                </Row>
            </Container>
            <Container className="pop-from-bottom">
                <Row className="justify-content-center">
                    {compareTracks.top_tracks.map((track) => {
                        return (
                            <Col xs="auto" className="p-sm-5" key={track.timeframe}>
                                <TopTrack topTrack={track} timeframeName={track.timeframe} />
                            </Col>
                        )
                    })}
                    {compareTracks.similar_tracks
                    ? <AllTracks topTracks={compareTracks.similar_tracks}
                                    title="Here are some songs that you kept listening to:"
                                    hideRank={true}/>
                    : <CompareText text="songs"/>
                    }
                </Row>
                <Row className="justify-content-center">
                    {compareArtists.top_artists.map((artist) => {
                        return (
                            <Col xs="auto" className="p-sm-5" key={artist.timeframe}>
                                <TopArtist topArtist={artist} timeframeName={artist.timeframe} />
                            </Col>
                        )
                    })}
                    {compareArtists.similar_artists
                    ? <AllArtists topArtists={compareArtists.similar_artists}
                                    title="Here are some artists that you kept listening to:"
                                    hideRank={true}/>
                    : <CompareText text="artists" />
                    }
                </Row>
                <Row className="justify-content-center">
                    {compareGenres.top_genres.map((genre) => {
                        return (
                            <Col xs="auto" className="p-sm-5" key={genre.timeframe}>
                                <TopGenre topGenre={genre} timeframeName={genre.timeframe} />
                            </Col>
                        )
                    })}
                    {compareGenres.genre_data
                    ? <GenerateCompareGenreGraph genreData={compareGenres.genre_data} />
                    : <CompareText text="genres" />}
                </Row>
                <Container id="compare-again">
                    <Row className="justify-content-center">
                        <Col xs="auto" className="p-3">
                            <Button variant="light" size="lg" onClick={() => props.setStartCompare(false)}>
                                Compare Again
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </Container>
        </>
    )
};

export default CompareHistory;