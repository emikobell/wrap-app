const GeneratePlaylist = (props) => {
    /**
     * Make a call to the server to create a Spotify playlist
     * for a given timeframe.
     */
    const [createPlaylist, setCreatePlaylist] = React.useState(false);
    const [playlistURL, setPlaylistURL] = React.useState("");

    React.useEffect(() => {
        const requestPlaylist = async (timeframe) => {
            const response = await fetch(`/playlist?timeframe=${timeframe}`);
        
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
        <ReactBootstrap.Container id="create-playlist">
            <ReactBootstrap.Row className="justify-content-center">
                <ReactBootstrap.Col xs="auto" className="d-flex text-center">
                    <p>
                        Want a playlist of your top 50 songs? <br />
                        Click the button below to generate a playlist on your Spotify account! 
                    </p>
                </ReactBootstrap.Col>
            </ReactBootstrap.Row>
            <ReactBootstrap.Row className="justify-content-center">
                <ReactBootstrap.Col xs="auto" className="p-3">
                    {createPlaylist ? <PlaylistCreated playlistURL={playlistURL} />
                    : <PlaylistButton setCreatePlaylist={setCreatePlaylist} />}
                </ReactBootstrap.Col>
            </ReactBootstrap.Row>
        </ReactBootstrap.Container>
    )
};

const PlaylistButton = (props) => {
    /**
     * Render a playlist creation button.
     */
    return (
        <ReactBootstrap.Button variant="light" size="lg" onClick={() => props.setCreatePlaylist(true)}>
            Create Playlist on Spotify
        </ReactBootstrap.Button>
    )
};

const PlaylistCreated = (props) => {
    /**
     * Render a playlist created button.
     */
    return (
        <ReactBootstrap.Button href={props.playlistURL} target="_blank" variant="secondary" className="text-white" size="lg">
            Go to Playlist
        </ReactBootstrap.Button>
    )
};