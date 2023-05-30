const GeneratePlaylist = (props) => {
    const [createPlaylist, setCreatePlaylist] = React.useState(false)

    React.useEffect(() => {
        const requestPlaylist = async (timeframe) => {
            const response = await fetch(`/playlist?timeframe=${timeframe}`);
            // Put error handling here
        };
        if (createPlaylist) {
            requestPlaylist(props.timeframe);
        }
    }, [createPlaylist]);

    return (
        <React.Fragment>
            {createPlaylist ? <PlaylistCreated />
            : <PlaylistButton setCreatePlaylist={setCreatePlaylist} />}
        </React.Fragment>
    )
};

const PlaylistButton = (props) => {
    return (
        <ReactBootstrap.Container id="create-playlist">
            <ReactBootstrap.Row className="justify-content-center">
                <ReactBootstrap.Col xs="auto" className="p-4">
                    <ReactBootstrap.Button variant="light" size="lg" onClick={() => props.setCreatePlaylist(true)}>
                        Create Playlist
                    </ReactBootstrap.Button>
                </ReactBootstrap.Col>
            </ReactBootstrap.Row>
        </ReactBootstrap.Container>
    )
};

const PlaylistCreated = () => {
    return (
        <ReactBootstrap.Container id="playlist-created">
            <ReactBootstrap.Row className="justify-content-center">
                <ReactBootstrap.Col xs="auto" className="p-4">
                    <ReactBootstrap.Button variant="light" size="lg" disabled>
                        Playlist Created!
                    </ReactBootstrap.Button>
                </ReactBootstrap.Col>
            </ReactBootstrap.Row>
        </ReactBootstrap.Container>
    )
};