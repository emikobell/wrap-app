const GeneratePlaylist = (props) => {
    const [createPlaylist, setCreatePlaylist] = React.useState(false)

    React.useEffect(() => {
        const requestPlaylist = async (timeframe) => {
            const response = await fetch(`/playlist?timeframe=${timeframe}`);
        
            if (response.status !== 200) {
                return (
                    <ShowError type="button" />
                )
            }
        };
        if (createPlaylist) {
            requestPlaylist(props.timeframe);
        }
    }, [createPlaylist]);

    return (
        <ReactBootstrap.Container id="create-playlist">
            <ReactBootstrap.Row className="justify-content-center">
                <ReactBootstrap.Col xs="auto" className="p-4">
                {createPlaylist ? <PlaylistCreated />
                : <PlaylistButton setCreatePlaylist={setCreatePlaylist} />}
                </ReactBootstrap.Col>
            </ReactBootstrap.Row>
        </ReactBootstrap.Container>
    )
};

const PlaylistButton = (props) => {
    return (
        <ReactBootstrap.Button variant="light" size="lg" onClick={() => props.setCreatePlaylist(true)}>
            Create Playlist
        </ReactBootstrap.Button>
    )
};

const PlaylistCreated = () => {
    return (
        <ReactBootstrap.Button variant="light" size="lg" disabled>
            Playlist Created!
        </ReactBootstrap.Button>
    )
};