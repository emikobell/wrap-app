const App = () => {

    const [pageLocation, setPageLocation] = React.useState("home")
    const [popupState, setPopupState] = React.useState(null);
    const [login, setLogin] = React.useState(false);
    const [userInfo, setUserInfo] = React.useState({
      'display_name': null,
      'img_url': null,
      'login_state': false,
    });

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
            setPopupState(null);
            setLogin(true);
            timer && clearInterval(timer);
          }
        }, 500);
      },
      [popupState]
    );

    React.useEffect(() => {
        const getUserInfo = async () => {
          if (!login) {
            return;
          }
          const userResponse = await fetch('/user-info');
          const responseParsed = await userResponse.json();
          setUserInfo(responseParsed);
        };

        getUserInfo();
        },
      [login]
      );

    const renderPageContent = (pageLocation) => {
        if (pageLocation == "wrap"){
            return <RenderWrap openSpotifyLogin={openSpotifyLogin} loginState={userInfo.login_state}/>
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