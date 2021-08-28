// searching for spotify playlists using keywords


let SpotifyWebApi = require('spotify-web-api-node');
const token = 'BQCNJbu9BuSLpzC9q-5WNmx-OkgDdts-Mr3sk5NtTPeObIpp39TkjkhhEJ7vFvU66X6nnqszEi1KVFNiAT5_xfbbksK5wN7cm161W_EVk3432ec8rLz1-75etM1t3OaeAQQxt0BhkJUJmd9_NTkvTvBwFxN77uo'
const spotifyApi = new SpotifyWebApi(
  {
    clientId: '9f710a7f6cf944b48396a1205b05814f',
    clientSecret: '2a18b428a71d49b393a5d9f4365dc51a',
    accessToken: token

  }
)

const link = 'https://open.spotify.com/playlist/1Gi8ggdgM5RaQj9F7nVL7g?si=0def70c6e4744248'



async function getSpotifyPlaylistsByKeywords(keywords) {
  const data = await spotifyApi.searchPlaylists(keywords)
  const items = data.body.playlists.items
  let playlists = []

  if (items.length == 0) return null
  else {
    for (let i = 0; i < items.length; i++) {
      const url = items[i].external_urls.spotify
      const desc = items[i].description
      playlists.push(new playlist(url, desc))
    }
  }
  return playlists
}

class playlist {
  /**
   * 
   * @param {string} url 
   * @param {string} desc 
   */
  constructor(url, desc) {
    this.url = url
    this.desc = desc
  }

}

/*
getSpotifyPlaylistsByKeywords("edm")
.then(playlists => {console.log(playlists)})
*/

// https://open.spotify.com/playlist/37i9dQZF1DX1kCIzMYtzum
// 37i9dQZF1DX1kCIzMYtzum



async function getTracksFromPlaylistById(id) {
  const tracks = (await spotifyApi.getPlaylistTracks('37i9dQZF1DX1kCIzMYtzum')).body.items
  let urls = []
  for (let i = 0; i < tracks; i++) {
    urls.push(tracks[i].track.external_urls.spotify)
  }
  return tracks
}
//getSpotifyPlaylistsByKeywords("edm").then(playlists => console.log(playlists))

//getTracksFromPlaylistById('37i9dQZF1DX1kCIzMYtzum').then(tracks => console.log(tracks))
const redirect_uri = "http://127.0.0.1:5500/index.html"
const AUTHORIZE = "https://accounts.spotify.com/authorize"
async function getAccessToken(client_id) {
    let url = AUTHORIZE;
    url += "?client_id=" + client_id;
    url += "&response_type=code";
    url += "&redirect_uri=" + encodeURI(redirect_uri);
    url += "&show_dialog=true";
    url += "&scope=user-read-private user-read-email user-modify-playback-state user-read-playback-position user-library-read streaming user-read-playback-state user-read-recently-played playlist-read-private";


  return url
}

getTracksFromPlaylistById('3Di88mvYplBtkDBIzGLiiM')
.then(playlists => console.log(playlists))