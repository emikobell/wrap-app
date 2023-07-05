import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Chart } from 'chart.js/auto';
import RenderWrap from './wrap/wrap.jsx';
import RenderCompare from './compare/compare.jsx';
import RenderHomeContent from './homepage/home.jsx';
import RenderNavbar from './homepage/navbar.jsx';
import { ShowError } from './utils/error.jsx';
import RenderFooter from './homepage/footer.jsx';

const App = () => {
	/**
	 * React application for the wrap app.
	 * React components are called in the following format:
	 * 
	 * App
	 * ├── RenderNavbar (homepage/navbar.jsx)
	 * │	├── RenderLoginProfile (utils/login.jsx)
	 * │	└── RenderNavLogin (utils/login.jsx)
	 * ├── RenderHomeContent (homepage/home.jsx)
	 * ├── RenderCompare (compare/compare.jsx)
	 * │   ├── RenderCompareDescription (compare/compareDescription.jsx)
	 * │   │	├── RenderCompareForm (compare/compareForm.jsx)
	 * │   │    └── RenderLoginButton (utils/login.jsx)
	 * │   └── CompareHistory (compare/compareHistory.jsx)
	 * │		├── ShowError (utils/error.jsx)
	 * │		├── RenderLoading (utils/loading.jsx)
	 * │		├── ShowNoItems (utils/error.jsx)
	 * │		├── TopTrack (utils/tracks.jsx)
	 * │		├── AllTracks (utils/tracks.jsx)
	 * │		├── CompareText (compare/compareText.jsx)
	 * │		├── TopArtist (utils/artists.jsx)
	 * │		├── AllArtists (utils/artists.jsx)
	 * │		├── TopGenre (utils/genres.jsx)
	 * │		└── GenerateCompareGenreGraph (utils/genres.jsx)
	 * ├── RenderWrap (wrap/wrap.jsx)
	 * │	├── RenderWrapDescription (wrap/wrapDescription.jsx)
	 * │	│	├── RenderWrapForm (wrap/wrapForm.jsx)
	 * │	│	└── RenderLoginButton (utils/login.jsx)
	 * │	└── WrapHistory (wrap/wrapHistory)
	 * │		├── ShowError (utils/error.jsx)
	 * │		├── RenderLoading (utils/loading.jsx)
	 * │		├── ShowNoItems (utils/error.jsx)
	 * │		├── TopTrack (utils/tracks.jsx)
	 * │		├── AllTracks (utils/tracks.jsx)
	 * │		├── TopArtist (utils/artists.jsx)
	 * │		├── AllArtists (utils/artists.jsx)
	 * │		├── TopGenre (utils/genres.jsx)
	 * │		├── AllGenres (utils/genres.jsx)
	 * │		└── GenerateCompareGenreGraph (utils/playlist.jsx)
	 * ├── ShowError (utils/error.jsx)
	 * └── RenderFooter (homepage/footer.jsx)
	 */

    const [pageLocation, setPageLocation] = useState("home")
    const [popupState, setPopupState] = useState(null);
    const [login, setLogin] = useState(false);
	const [logoutRequested, setLogOutRequested] = useState(false);
    const [userInfo, setUserInfo] = useState({
      'display_name': null,
      'img_url': null,
      'login_state': false,
    });
	const [errorState, setErrorState] = useState(false);

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

	// Override chart js default color at page render

	Chart.defaults.plugins.colors.enabled = false;
	Chart.defaults.backgroundColor = [
		'rgb(38, 70, 83)',
		'rgb(42, 157, 143)',
		'rgb(233, 196, 106)',
		'rgb(244, 162, 97)',
		'rgb(231, 111, 81)',
		'rgb(220, 220, 220)',
	];

    useEffect(() => {
        const fetchUserLogin = async () => {
			const login = await fetch('/api/login-check');

			if (login.status !== 200) {
				setErrorState(true);
				return;
			}

			const loginParsed = await login.json();
			setLogin(loginParsed);
        } ;
		fetchUserLogin();
    }, []);

    useEffect(() => {
        if (!popupState) {
          return;
        }
        
        const timer = setInterval(() => {

				const currentUrl = popupState.location.href;

				if (!currentUrl) {
					return;
				}

				const {searchParams} = new URL(currentUrl);
				const code = searchParams.get('code');

				if (!code) {
					return;
				}

				popupState.close();
				setPopupState(null);
				setLogin(true);
				timer && clearInterval(timer);
		}, 500);
	}, [popupState]);

    useEffect(() => {
        const getUserInfo = async () => {
			const userResponse = await fetch('/api/user-info');

			if (userResponse.status !== 200) {
				setErrorState(true);
				setTimeout(() => {
					handleLogOut();
				}, 5000);
				return;
			}

			const responseParsed = await userResponse.json();
			setUserInfo(responseParsed);
        };

		if (login) {
			getUserInfo();
		}
    }, [login]);

	useEffect(() => {
		const userLogOut = async () => {
				const response = await fetch('/api/logout');
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
        if (pageLocation === "wrap"){
            return <RenderWrap openSpotifyLogin={openSpotifyLogin} userInfo={userInfo} />
        } else if (pageLocation === "compare") {
            return <RenderCompare openSpotifyLogin={openSpotifyLogin} userInfo={userInfo} />
        } else {
            return <RenderHomeContent handlePageLocation={handlePageLocation} />
        };
    };

    return (
        <>
            <RenderNavbar handlePageLocation={handlePageLocation}
							pageLocation={pageLocation}
							openSpotifyLogin={openSpotifyLogin}
							userInfo={userInfo}
							handleLogOut={handleLogOut}/>
			<Container fluid className="p-4 py-5" id="page-content">
            	{errorState ? <ShowError type="main" /> : renderPageContent(pageLocation)}
			</Container>
			<RenderFooter />
        </>
    );
};

export default App;