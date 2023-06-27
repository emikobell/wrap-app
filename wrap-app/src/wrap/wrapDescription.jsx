import { Container, Row, Col, Image } from 'react-bootstrap';
import { RenderLoginButton } from '../utils/login.jsx';
import RenderWrapForm from './wrapForm.jsx';

const RenderWrapDescription = (props) => {
    /**
     * Render the description page for the wrap feature.
     */
    return (
        <>
            <Container id="page-content">
                <Row className="justify-content-center pop-to-front">
                    <Col xs="auto">
                        <Image src="../img/wrap2.png" className="img-fluid" alt="Image of three lines, each with a loop" width="700px"/>
                    </Col>
                </Row>
                <Row className="justify-content-center pop-from-bottom">
                    <Col xs="auto" className="p-3">
                        <h1>
                            Wrap your listening history.
                        </h1>
                        <p className="fs-4">
                            Wrap your short, medium, and long term
                            Spotify listening history. <br />
                            You can also choose to generate a playlist of your top songs!
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
            {props.loginState && <RenderWrapForm handleWrapStart={props.handleWrapStart}/>}
        </>
    )
};

export default RenderWrapDescription;