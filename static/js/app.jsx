const App = () => {

    const [pageLocation, setPageLocation] = React.useState("home")
    const [popupState, setPopupState] = React.useState(null);
    const [loginState, setLoginState] = React.useState(false);

    const handlePageLocation = (location) => {
        setPageLocation(location)
    };

    const openSpotifyLogin = () => {
        setPopupState(window.open("/login", "", "popup"));
    };

    React.useEffect(() => {
        if (!popupState) {
          return;
        }
        const timer = setInterval(() => {
          if (!popupState) {
            timer && clearInterval(timer);
            return;
          }
          const currentUrl = popupState.location.href;
          if (!currentUrl) {
            return;
          }
          const {searchParams} = new URL(currentUrl);
          const code = searchParams.get('code');
          if (code) {
            popupState.close();
            setLoginState(true);
            setPopupState(null);
            timer && clearInterval(timer);
          }
        }, 500)
      },
      [popupState]
    );   

    const renderPageContent = (pageLocation) => {
        if (pageLocation == "wrap"){
            return <RenderWrap openSpotifyLogin={openSpotifyLogin} loginState={loginState}/>
        } else if (pageLocation == "compare") {
            return <RenderCompare openSpotifyLogin={openSpotifyLogin} />
        } else {
            return <RenderHomeContent handlePageLocation={handlePageLocation}/>
        };
    };

    return (
        <React.Fragment>
            <RenderNavbar handlePageLocation={handlePageLocation} pageLocation={pageLocation}/>
            {renderPageContent(pageLocation)}
        </React.Fragment>
    );
};


ReactDOM.render(<App />, document.getElementById("react-app"));