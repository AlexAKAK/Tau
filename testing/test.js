// searching for spotify playlists using keywords


let SpotifyWebApi = require('spotify-web-api-node');
const token = 'BQBh5pDXgxvt3sMj0fcnP-YzxKqp7IYylezTdyvfE5vGdbDwVKVwSHqJQ-FcR9XoO_Tm3rbl6JFluVhn9Qh_E_0j1sUAzBQgvtMuWMgWyfvDm-GT9bliZmXr-zPlkqEY5el5C8SlNMRKmVJ3prj5MK9wk0DDr30'
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


spotifyApi.getPlaylistTracks('2e3dcRuo9uDH6qD3NOGKAL')
.then(tracks => console.log(tracks.body.items[0].track.external_urls.spotify))

spotifyApi.getPlaylist()
