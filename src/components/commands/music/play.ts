import CommandClass from "./../../classes/CommandClass"
const { getInfo } = require('ytdl-core')
const ytdl = require('ytdl-core');
const sendEmbed = require('./../../utility/embeds/sendEmbed');
const { red, randomColor } = require('./../../utility/hexColors');
import checkQueueThenHandle = require('./../../utility/checkQueueThenHandle');
const playAudio = require('./../../utility/playAudio');
import { Client, Message } from 'discord.js';
const getYoutubeVideoUrlFromKeyword = require('./../../utility/getYoutubeVideoURLFromKeyword');
//const CommandClass = require('../classes/CommandClass');
import HydroCarbon from './../../../index'
import { ERROR } from "../../classes/Errors";
import getAudio from "./../../utility/getAudio"
import { InternalSymbolName } from "typescript";
import getYTLinkFromSpotifyLink from "../../utility/spotify/getYTLinkFromSpotifyLink";
export {}
const {getData} = require('spotify-url-info')

const spdl = require('spdl-core')
const ytsr = require('ytsr')

@play.alias(['p'])

@play.errorCheck([
    play.CLIENT_NOT_IN_VC_ERR,
    play.MEMBER_NOT_IN_VC_ERR, 
    play.MISSING_ARGS_ERR_2
    /*, play.MEMBER_IN_DIFFERENT_VC_THAN_CLIENT_ERR*/
])

export default class play extends CommandClass {
    protected static commandCategory: string = 'music'
    protected static commandDescription: string = 'I play a song by name or youtube link'
    protected static commandSyntax: string = 'play <youtube link/search query>'

    static MISSING_ARGS_ERR_2: ERROR = play.MISSING_ARGS_ERR_METACLASS(2)

    static async ytQueueAdd(message: Message, client: HydroCarbon) {
        const args = play.splitArgs(message)
        const url = args[1]
        const info = await getInfo(url)
        const audio = getAudio(url)

        // add the song to the queue of the voice channel
        client.queueMap[message.guild.id]['queue'].push({
            audio: audio,
            url: url,
            songName: info['videoDetails']['title'],
            author: message.author,
                            
        })

        sendEmbed(message.channel, {
            title: `Added to queue: ${info['videoDetails']['title']}`,
            color: randomColor(),
            deleteTimeout: 5000,
                            

        }) // end of sendEmbed()
                    
        return false
    }
    static async ytPlay(message: Message, client: HydroCarbon) {
        const args = play.splitArgs(message)
        const url = args[1]
        const info = await getInfo(url)
        if (info == null || info == undefined) {
            sendEmbed(message.channel, {
                title: 'No videos found',
                color: 'Red',
                deleteTimeout: 5000
            })
        }
        const audio = await getAudio(url)

    await playAudio(audio, message.member.voice.channel, url, message)
        client.queueMap[message.guild.id] = {
            playing: {
                audio: audio,
                url: url,
                songName: info['videoDetails']['title'],
                author: message.author
                                
            },
            queue: [],
        }   
                    // add the voice channel as a key in client.queueMap  
    return false
    }

    
    static async kwPlay(message: Message, client: HydroCarbon, audio: any, url: string) {

        console.log('kwPlay')

        const info = await getInfo(url)
        if (info == null || info == undefined) play.handleNoVideoFound(message)

        // playAudio(message.client, audio, message.channel, message.author.voice.channel)
        await playAudio(audio, message.member.voice.channel, url, message)
        client.queueMap[message.guild.id] = {
            playing: {
            audio: audio,
            url: url,
            songName: info['videoDetails']['title'],
            author: message.author
                                
            },
                queue: [],
        }   
                    // add the voice channel as a key in client.queueMap  
            //return false


            // STEP 2c


        return false
            
            
    }


    static async kwQueueAdd(message: Message, client: HydroCarbon, audio: any, url: string){
        const info = await getInfo(url)
            // add the song to the queue of the voice channel
        client.queueMap[message.guild.id]['queue'].push({
            audio: audio,
            url: url,
            songName: info['videoDetails']['title'],
            author: message.author
        })

        sendEmbed(message.channel, {
            title: `Added to queue: ${info['videoDetails']['title']}`,
            color: randomColor(),
            deleteTimeout: 5000,
        }) // end of sendEmbed()
        
        //return false 

    }

    static async yt(message: Message, client: HydroCarbon) {
    
        /*
        -if connection is defined/nonnull
        -if the dispatcher is defined/nonull
        
        */
    // start working here
    
        if (message.guild.me.voice.connection.dispatcher != null || message.guild.me.voice.connection.dispatcher != undefined) await play.ytPlay(message, client)           
        else play.ytQueueAdd(message, client)
    }
    static async kw(message: Message, client: HydroCarbon) {
        console.log('kw')
        const keyWords = message.content.substring(message.content.indexOf(' ') + 1)
    
        const url = await getYoutubeVideoUrlFromKeyword(keyWords)
        if (url == null) {
            sendEmbed(message.channel, {
                title: `no videos found, ${message.author.tag}`,
                color: randomColor(),
                deleteTimeout: 5000,
                
            })

            return true
        }

        const audio = await getAudio(url)

        if (message.guild.me.voice.connection.dispatcher == null || message.guild.me.voice.connection.dispatcher == undefined) play.kwPlay(message, client, audio, url)
        else play.kwQueueAdd(message, client, audio, url)
    }

    static async spotifyPlay(message: Message, client: HydroCarbon, audio: any, url: string) {
        const infoy = await getInfo(url)
        const songData = await getYTLinkFromSpotifyLink(url)
        if (infoy == null || infoy == undefined) play.handleNoVideoFound(message)
        client.queueMap[message.guild.id] = {
            playing: {
                audio: audio,
                url: songData['url'],
                songName: infoy['videoDetails']['title'],
                author: message.author
                                
            },
            queue: [],
        }
        
    }

    static async spotifyAdd(message: Message, client: HydroCarbon, audio: any, url: string) {
        const info = await getInfo(url)
        client.queueMap[message.guild.id]['queue'].push({
            audio: audio,
            url: url,
            songName: info['videoDetails']['title'],
            author: message.author
        })

        sendEmbed(message.channel, {
            title: `Added to queue: ${info['videoDetails']['title']}`,
            color: randomColor(),
            deleteTimeout: 5000,
        }) // end of sendEmbed()
        
        //return false 
    }

    static async spotify(message: Message, client: HydroCarbon) {
        const spotifyURL = play.removePrefixAndCommandFromString(message.content, client.PREFIX)
        console.log(spotifyURL)
        const firstSearch: object = await getData(spotifyURL)
        if (firstSearch['tracks'] != undefined) {
            let trackUrls: string[] = []
            for (let i = 0; i < firstSearch['tracks']['items'].length; i++) {
                
                if (firstSearch['tracks']['items'][i]['track'] == null){} else trackUrls.push(firstSearch['tracks']['items'][i]['track']['external_urls']['spotify'])
            }

            await play.spotifyPlaylist(message, client, trackUrls)
            return
        }

        
        //
        // change this back to the original link in a bit //
        //
        const infos = await spdl.getInfo(spotifyURL)
        console.log(infos)
        const artistAndName = infos.artist + " " + infos.title
        const searchResults = await ytsr(artistAndName, { limit: 1 })
        console.log(searchResults)
        const ytURL = searchResults.items[0].url
        const audio = ytdl(ytURL)

        console.log(`dispatcher ${message.guild.me.voice.connection.dispatcher}`)

        if (message.guild.me.voice.connection.dispatcher == null || message.guild.me.voice.connection.dispatcher == undefined) play.kwPlay(message, client, audio, ytURL)           
        else play.kwQueueAdd(message, client, audio, ytURL)
    }

    static async spotifyPlaylist(message: Message, client: HydroCarbon, tracks: string[]) {
        console.log('spotify playlist')
        console.log(tracks)

        let playing: boolean = false
        for (let i = 0; i < tracks.length; i++) {
            if (message.guild.me.voice.connection.dispatcher == null && playing == false) {
                console.log('dispatcher is null')
                const songData = await getYTLinkFromSpotifyLink(tracks[i])
                client.queueMap[message.guild.id] = {
                    playing: {
                        url: tracks[i],
                        author: message.author,
                        audio: songData['audio'],
                        songName: songData['songName']
                                    
                    },
                    queue: [],
                }

                playing = true
                
                await playAudio(songData['audio'], message.member.voice.channel, songData['url'], message)
            }                
            
            else {
                client.queueMap[message.guild.id]['queue'].push({
                   
                    url: tracks[i],
                    type: 'spotify',
                    author: message.author
                })
                play.loadUnloadedSongs(message, client)
            }
        }

        /*
        for (let i = 0; i < tracks.length; i++) {
            const audio = ytdl(ytTracks[i])
            if (message.guild.me.voice.connection.dispatcher == null || message.guild.me.voice.connection.dispatcher == undefined) play.kwPlay(message, client, audio, ytTracks[i])           
            else play.kwQueueAdd(message, client, audio, ytTracks[i])
            
        }
        */
        
        
    }


    public async commandMain(message: Message, client: HydroCarbon) {
        const isYTLink = message.content.match('http(?:s?):\\/\\/(?:www\\.)?youtu(?:be\\.com\\/watch\?v=|\.be\\/)([\\w\\-\\_]*)(&(amp;)?‌​[\\w\\?‌​=]*)?')
        const re = /((open|play)\.spotify\.com\/)/
        const isSpotifyLink = re.test(play.removePrefixAndCommandFromString(message.content, client.PREFIX))
    
        if (isYTLink) play.yt(message, client)
        else if (isSpotifyLink) play.spotify(message, client)
        else play.kw(message, client)

    }

    

    static async handleNoVideoFound(message: Message) {
        sendEmbed(message.channel, {
            title: `No video results found, ${message.author.tag}.`,
            color: 'RED',
            deleteTimeout: 5000
        })

    }

    static async loadUnloadedSongs(message: Message, client: HydroCarbon) {
        for (let i = 0; i < client.queueMap[message.guild.id]['queue'].length; i++) {
            if (client.queueMap[message.guild.id]['queue'][i]['type'] == 'spotify') {
                const data: object = await getYTLinkFromSpotifyLink(client.queueMap[message.guild.id]['queue'][i]['url'])
                client.queueMap[message.guild.id]['queue'][i]['url'] = data['url']
                client.queueMap[message.guild.id]['queue'][i]['audio'] = data['audio']
                client.queueMap[message.guild.id]['queue'][i]['songName'] = data['songName']
                client.queueMap[message.guild.id]['queue'][i]['type'] = undefined
            }
        }
  
    }

}
