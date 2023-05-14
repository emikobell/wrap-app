// function App() {

//     (async () => {
//         const response_list = []

//         const artist_response = await fetch('/top_artists?timeframe=long_term');
//         response_list.push(await artist_response.json());
    
//         const track_response = await fetch('/top_tracks?timeframe=long_term');
//         response_list.push(await track_response.json());
    
//         const genre_response = await fetch('/top_genres?timeframe=long_term');
//         response_list.push(await genre_response.json());

//         return response_list
//     })()

//     return (
//         <React.Fragment>
//             <div className ="row align-items-center">
//                 <div className="col text-center">
//                     <h2>
//                         Wrap your Spotify<br />
//                         history every day of the year.
//                     </h2>
//                 </div>
//             </div>
//         </React.Fragment>
//     );
// }

// ReactDOM.render(<App />, document.getElementById("react-app"));