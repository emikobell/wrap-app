import { Container, Row, Col, Image } from 'react-bootstrap';
import { RenderLoginButton } from '../utils/login.jsx';
import RenderCompareForm from './compareForm.jsx';

const RenderCompareDescription = (props) => {
    /**
     * Render the description page for the compare feature.
     */
    return (
            <>
                <Container id="page-content">
                    <Row className="justify-content-center pb-4 pop-to-front">
                        <Col xs="auto">
                            <Image src="../img/compare.png" alt="Image of two overlapping circles" className="img-fluid" width="500px"/>
                        </Col>
                    </Row>
                    <Row className="justify-content-center pop-from-bottom">
                        <Col xs="auto" className="p-3">
                            <h1>
                                Compare your listening history.
                            </h1>
                            <p className="fs-4">
                                Compare your short, medium,
                                and long term Spotify listening history.
                            </p>
                            <ul className="fs-4">
                                <li><strong>Short term:</strong> Last month</li>
                                <li><strong>Medium term:</strong> Last six months</li>
                                <li><strong>Long term:</strong> Last several years</li>
                            </ul>
                        </Col>
                    </Row>
                </Container>
                {!props.loginState && <RenderLoginButton openSpotifyLogin={props.openSpotifyLogin}/>}
                {props.loginState && <RenderCompareForm handleCompareStart={props.handleCompareStart}
                                                        setTimeframe1={props.setTimeframe1}
                                                        setTimeframe2={props.setTimeframe2} />}
            </>
    )
};

export default RenderCompareDescription;