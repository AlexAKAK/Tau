const spdl = require('spdl-core')
const ytsr = require('ytsr')
const ytdl = require('ytdl-core')
const {getInfo} = require('ytdl-core')
const {getData} = require('spotify-url-info')

export default async function getYTLinkFromSpotifyLink(spotifyLink: string): Promise<object> {

    const infos = await spdl.getInfo(spotifyLink)

  
    const artistAndName = infos.artist + " " + infos.title

    const searchResults = await ytsr(artistAndName, { limit: 1 })
 
    const ytURL = searchResults.items[0]['url']
  

    const audio = ytdl(ytURL)
 
  
    const infoy = await getInfo(ytURL)
   

 
    return {
        audio: audio,
        url: ytURL,
        songName: infoy['videoDetails']['title']
    }
}
