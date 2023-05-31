const GenerateArtistButton = (props) => {
    return (
        <React.Fragment>
            <ReactBootstrap.Button variant="light" size="lg" onClick={props.handleArtistVisibility}>
                {props.buttonText}
            </ReactBootstrap.Button>
        </React.Fragment>
    )
};


const TopArtist = (props) => {
    return (
        <React.Fragment>
            <ReactBootstrap.Container id="top-artist">
                <ReactBootstrap.Row className="justify-content-center">
                    <ReactBootstrap.Col xs="auto" className="p-5">
                        <h1>Your top artist:</h1>
                    </ReactBootstrap.Col>
                </ReactBootstrap.Row>
                <ReactBootstrap.Row className="justify-content-center">
                    <ReactBootstrap.Col xs="auto">
                        <ReactBootstrap.Image src={props.topArtists[0]['img']} alt="Image of album cover" rounded />
                    </ReactBootstrap.Col>
                </ReactBootstrap.Row>
                <ReactBootstrap.Row className="justify-content-center">
                    <ReactBootstrap.Col xs="auto">
                        <h2><a href={props.topArtists[0]['url']} target="_blank">{props.topArtists[0]['name']}</a></h2>
                    </ReactBootstrap.Col>
                </ReactBootstrap.Row>
            </ReactBootstrap.Container>
        </React.Fragment>
    )
};


const AllArtists = (props) => {
    const [artistVisibility, setArtistVisibility] = React.useState(false);
    const [artistNumber, setArtistNumber] = React.useState(5);
    const [buttonText, setButtonText] = React.useState("Show All 10 Artists");

    const handleArtistVisibility = () => {
        if (!artistVisibility) {
            setArtistVisibility(true);
            setArtistNumber();
            setButtonText("Hide Artists")
        } else {
            setArtistVisibility(false);
            setArtistNumber(5);
            setButtonText("Show All 10 Artists");
        }
    };
    
    return (
        <React.Fragment>
            <ReactBootstrap.Container id="all-top-tracks">
                <ReactBootstrap.Row className="justify-content-center">
                    <ReactBootstrap.Col xs="auto" className="p-5">
                        <h1>Your top artists:</h1>
                    </ReactBootstrap.Col>
                </ReactBootstrap.Row>
                <ReactBootstrap.Row className="justify-content-center">
                    <ReactBootstrap.Col xs="auto">
                        <ReactBootstrap.Table borderless hover className="align-middle">
                            <tbody>
                                {props.topArtists.slice(0,artistNumber).map((artist) => {
                                    return (
                                    <React.Fragment key={artist.rank}>
                                    <tr>
                                        <td><h2>{artist.rank}</h2></td>
                                        <td><ReactBootstrap.Image src={artist.img} alt={"Image of artist, " + artist.name} rounded fluid height="100px" width="100px" /></td>
                                        <td><h4><a href={artist.url} target="_blank">{artist.name}</a></h4></td>
                                    </tr>
                                    </React.Fragment>
                                )})}
                            </tbody>
                        </ReactBootstrap.Table>
                    </ReactBootstrap.Col>
                </ReactBootstrap.Row>
                <ReactBootstrap.Row className="justify-content-md-center">
                    <ReactBootstrap.Col xs="auto">
                        <GenerateArtistButton handleArtistVisibility={handleArtistVisibility} buttonText={buttonText}/>
                    </ReactBootstrap.Col>
                </ReactBootstrap.Row>
            </ReactBootstrap.Container>
        </React.Fragment>
    )
};