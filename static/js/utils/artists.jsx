const GenerateArtistButton = (props) => {
    /**
     * Render a button to show more artists or hide them.
     */
    return (
        <React.Fragment>
            <ReactBootstrap.Button variant="light" size="lg" onClick={props.handleArtistVisibility}>
                {props.buttonText}
            </ReactBootstrap.Button>
        </React.Fragment>
    )
};


const TopArtist = (props) => {
    /**
     * Render the user's top artist.
     */
    return (
        <React.Fragment>
            <ReactBootstrap.Container id="top-artist" className="py-3">
                <ReactBootstrap.Row className="justify-content-center">
                    <ReactBootstrap.Col xs="auto" className="p-3">
                        <h1>Your <strong>{props.timeframeName}</strong> top artist:</h1>
                    </ReactBootstrap.Col>
                </ReactBootstrap.Row>
                <ReactBootstrap.Row className="justify-content-center">
                    <ReactBootstrap.Col xs="auto" className="p-4">
                        <ReactBootstrap.Image src={props.topArtist['img']} alt="Image of album cover" className="img-fluid" rounded />
                    </ReactBootstrap.Col>
                </ReactBootstrap.Row>
                <ReactBootstrap.Row className="justify-content-center">
                    <ReactBootstrap.Col xs="auto">
                        <h2><a href={props.topArtist['url']} target="_blank">{props.topArtist['name']}</a></h2>
                    </ReactBootstrap.Col>
                </ReactBootstrap.Row>
            </ReactBootstrap.Container>
        </React.Fragment>
    )
};


const AllArtists = (props) => {
    /**
     * Render the user's top artists.
     */
    const [artistVisibility, setArtistVisibility] = React.useState(false);
    const [artistNumber, setArtistNumber] = React.useState(5);
    const [buttonText, setButtonText] = React.useState("Show More Artists");

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
        <React.Fragment>
            <ReactBootstrap.Container id="all-top-artists" className="py-3">
                <ReactBootstrap.Row className="justify-content-center">
                    <ReactBootstrap.Col xs="auto" className="p-3">
                        <h1>{props.title}</h1>
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
                                        {!props.hideRank && <td><h2>{artist.rank}</h2></td>}
                                        <td><ReactBootstrap.Image src={artist.img} alt={"Image of artist, " + artist.name} rounded fluid height="100px" width="100px" /></td>
                                        <td><h4><a href={artist.url} target="_blank">{artist.name}</a></h4></td>
                                    </tr>
                                    </React.Fragment>
                                )})}
                            </tbody>
                        </ReactBootstrap.Table>
                    </ReactBootstrap.Col>
                </ReactBootstrap.Row>
                <ReactBootstrap.Row className="justify-content-center">
                    <ReactBootstrap.Col xs="auto" className="p-3">
                        <GenerateArtistButton handleArtistVisibility={handleArtistVisibility} buttonText={buttonText}/>
                    </ReactBootstrap.Col>
                </ReactBootstrap.Row>
            </ReactBootstrap.Container>
        </React.Fragment>
    )
};