import playlist from "../classes/playlist"

let SpotifyWebApi = require('spotify-web-api-node')
//const token = 'BQBh5pDXgxvt3sMj0fcnP-YzxKqp7IYylezTdyvfE5vGdbDwVKVwSHqJQ-FcR9XoO_Tm3rbl6JFluVhn9Qh_E_0j1sUAzBQgvtMuWMgWyfvDm-GT9bliZmXr-zPlkqEY5el5C8SlNMRKmVJ3prj5MK9wk0DDr30'
const token = 'BQCNJbu9BuSLpzC9q-5WNmx-OkgDdts-Mr3sk5NtTPeObIpp39TkjkhhEJ7vFvU66X6nnqszEi1KVFNiAT5_xfbbksK5wN7cm161W_EVk3432ec8rLz1-75etM1t3OaeAQQxt0BhkJUJmd9_NTkvTvBwFxN77uo'

export default async function getSpotifyPlaylistsByKeywords(keywords) {
    const spotifyApi = new SpotifyWebApi(
  {
    clientId: '9f710a7f6cf944b48396a1205b05814f',
    clientSecret: '2a18b428a71d49b393a5d9f4365dc51a',
    accessToken: token

  }
)


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