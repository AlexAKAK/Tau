const spdl = require('spdl-core')
const ytsr = require('ytsr')
const ytdl = require('ytdl-core')
const {getInfo} = require('ytdl-core')
const {getData} = require('spotify-url-info')

export default async function getYTLinkFromSpotifyLink(spotifyLink: string): Promise<object> {
    console.log('getYTLinkFromSpotifyLink')
    const infos = await spdl.getInfo(spotifyLink)
    console.log('got info')
  
    const artistAndName = infos.artist + " " + infos.title

    const searchResults = await ytsr(artistAndName, { limit: 1 })
    console.log('got serach resuts from ytsr')
    const ytURL = searchResults.items[0]['url']
    console.log('got url')

    const audio = ytdl(ytURL)
    console.log('got audio')
    console.log(ytURL)
    const infoy = await getInfo(ytURL)
    console.log('got infoy')

    console.log(infoy['videoDetails']['title'])  
    return {
        audio: audio,
        url: ytURL,
        songName: infoy['videoDetails']['title']
    }
}
