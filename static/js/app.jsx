const App = () => {

    const [pageLocation, setPageLocation] = React.useState("home")
    const [popupState, setPopupState] = React.useState(null);
    const [login, setLogin] = React.useState(false);
	const [logoutRequested, setLogOutRequested] = React.useState(false);
    const [userInfo, setUserInfo] = React.useState({
      'display_name': null,
      'img_url': null,
      'login_state': false,
    });
	const [errorState, setErrorState] = React.useState(false);

    const handlePageLocation = (location) => {
        setPageLocation(location)
    };

    const openSpotifyLogin = () => {
        setPopupState(window.open("/login", "", "popup"));
    };

	const handleLogOut = () => {
		setLogOutRequested(true);
		setLogin(false);
	};

    React.useEffect(() => {
        const fetchUserLogin = async () => {
			const login = await fetch('/login-check');

			if (login.status !== 200) {
				setErrorState(true);
				return;
			}

			const loginParsed = await login.json();
			setLogin(loginParsed);
        } ;
		fetchUserLogin();
    }, []);

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
	}, [popupState]);

    React.useEffect(() => {
        const getUserInfo = async () => {
			const userResponse = await fetch('/user-info');

			if (userResponse.status !== 200) {
				handleLogOut()
				return;
			}

			const responseParsed = await userResponse.json();
			setUserInfo(responseParsed);
        };

		if (login) {
			getUserInfo();
		}
    }, [login]);

	React.useEffect(() => {
		const userLogOut = async () => {
				const response = await fetch('/logout');
				if (response.status !== 200) {
					setErrorState(true);
					return;
				}
				window.location.reload();
			};
			
		if (logoutRequested) {
			userLogOut();
		}
	}, [logoutRequested]);

    const renderPageContent = (pageLocation) => {
        if (pageLocation == "wrap"){
            return <RenderWrap openSpotifyLogin={openSpotifyLogin} userInfo={userInfo} />
        } else if (pageLocation == "compare") {
            return <RenderCompare openSpotifyLogin={openSpotifyLogin} userInfo={userInfo} />
        } else {
            return <RenderHomeContent handlePageLocation={handlePageLocation} />
        };
    };

    return (
        <React.Fragment>
            <RenderNavbar handlePageLocation={handlePageLocation}
							pageLocation={pageLocation}
							openSpotifyLogin={openSpotifyLogin}
							userInfo={userInfo}
							handleLogOut={handleLogOut}/>
			<ReactBootstrap.Container fluid className="my-4">
            	{errorState ? <ShowError type="main" /> : renderPageContent(pageLocation)}
				<RenderFooter />
			</ReactBootstrap.Container>
        </React.Fragment>
    );
};

const container = document.getElementById("react-app");
const root = ReactDOM.createRoot(container);
root.render(<App />);