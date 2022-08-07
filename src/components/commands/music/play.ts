import CommandClass from "./../../classes/CommandClass.js"
import ytdl from 'ytdl-core';
const getInfo = ytdl.getInfo
import sendEmbed from './../../utility/embeds/sendEmbed.js';
//import { red, randomColor } from './../../utility/hexColors';
import checkQueueThenHandle from './../../utility/checkQueueThenHandle.js'
import playAudio from './../../utility/playAudio.js';
import { Client, Message, TextChannel } from 'discord.js';
import getYoutubeVideoUrlFromKeyword from './../../utility/getYoutubeVideoURLFromKeyword.js';
//const CommandClass = require('../classes/CommandClass');
import Tau from './../../../index.js'
import { ERROR } from "../../classes/Errors.js";
import getAudio from "./../../utility/getAudio.js"
import { collapseTextChangeRangesAcrossMultipleVersions, InternalSymbolName } from "typescript";
import getYTLinkFromSpotifyLink from "../../utility/spotify/getYTLinkFromSpotifyLink.js";
import defaultColor from "../../utility/embeds/defaultColor.js";
//import { getData, getTracks } from 'spotify-url-info';
import { createAudioPlayer } from '@discordjs/voice';

import fetch from "isomorphic-unfetch"


import spotifyUrlInfoG from 'spotify-url-info'
const spotifyUrlInfo = spotifyUrlInfoG(fetch)
const {getData, getTracks} = spotifyUrlInfo


import spdl from 'spdl-core';
import ytsr from 'ytsr';

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

    static botIsAlreadyPlayingSomething(message: Message, client: Tau) {
        const a = client.queueMap[message.guild.id]['playing']

        if (a == null || a == undefined) return false
        else return true
    }


    static async ytQueueAdd(message: Message, client: Tau) {
        const args = play.splitArgs(message)
        const url = args[1]
        let info: object;
        getInfo(url)
        .then(info => 
        {
            const audio = getAudio(url)
            client.queueMap[message.guild.id]['queue'].push({
                        audio: audio,
                        url: url,
                        songName: info['videoDetails']['title'],
                        author: message.author,
                                        
                    })

                    sendEmbed(message.channel, {
                        title: `Added to queue: ${info['videoDetails']['title']}`,
                        color: '#ffff00',
                        deleteTimeout: 5000,
                                        

                    }) // end of sendEmbed()



        })
        .catch(err => {
            play.videoCannotBeAccessed(message, client)
            return
        })
        





        // add the song to the queue of the voice channel
        
                    
        return false
    }
    static async ytPlay(message: Message, client: Tau) {
        console.log('ytPlay')
        const args = play.splitArgs(message)
        const url = args[1]
        getInfo(url)
        .then(async info =>
        {
            console.log('then')
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

        })
        .catch(err =>
        {
            console.log('sus')
            play.videoCannotBeAccessed(message, client)
            return
        })

        
            
       
        
            
        
        
    }

    
    static async kwPlay(message: Message, client: Tau, audio: any, url: string) {

        console.log('kwPlay')

        let info: object;
        getInfo(url)
        .then(async info => 
        {
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
        })
        .catch(err => 
        {
            play.videoCannotBeAccessed(message, client)
            return
        })
        
        
        
            
            
    }


    static async kwQueueAdd(message: Message, client: Tau, audio: any, url: string) {
        console.log('kwQueueAdd')
        getInfo(url)
        .then(async info => 
        {
            client.queueMap[message.guild.id]['queue'].push({
                        audio: audio,
                        url: url,
                        songName: info['videoDetails']['title'],
                        author: message.author
                    })

                    sendEmbed(message.channel, {
                        title: `Added to queue: ${info['videoDetails']['title']}`,
                        color: '#ffff00',
                        deleteTimeout: 5000,
                    }) // end of sendEmbed()
                    
                    //return false
        })
        .catch(err => 
        {
            play.videoCannotBeAccessed(message, client)
            return
        })

    }

    static async yt(message: Message, client: Tau) {
        console.log('yt')
    
        /*
        -if connection is defined/nonnull
        -if the dispatcher is defined/nonull
        
        */
    // start working here
    
        if (this.botIsAlreadyPlayingSomething(message, client)) await play.ytPlay(message, client)           
        else play.ytQueueAdd(message, client)
    }
    private static async kw(message: Message, client: Tau) {
        console.log('kw')
        const keyWords = message.content.substring(message.content.indexOf(' ') + 1)
        let url: string
        try {
            url = await getYoutubeVideoUrlFromKeyword(keyWords)
        }
        catch {
            console.log('jahegkj haegkljhadg')
            play.videoCannotBeAccessed(message, client)
            return
        }
        console.log('got info')
        if (url == null) {
            sendEmbed(message.channel, {
                title: `No videos found for: ${keyWords}`,
                color: "#ffff00",
                deleteTimeout: 5000,
                
            })

            return true
        }

        try {
            const audio = await getAudio(url)
            console.log('aelgkjaeglkjeaglkjaeglj')
            // check if the connection's player is playing something
          
            if (!client.isAlreadyPlayingSomething(message)) {
                console.log('1234')
                play.kwPlay(message, client, audio, url)
            }
            
            else {
                console.log('5678')
                play.kwQueueAdd(message, client, audio, url)
            }
        }
        catch {
            console.log('susssss1351361613636')
            play.videoCannotBeAccessed(message, client)
        }
        

        
    }

    private static async spotifyPlay(message: Message, client: Tau, audio: any, url: string) {
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

    private static async spotifyAdd(message: Message, client: Tau, audio: any, url: string) {
        const info = await getInfo(url)
        client.queueMap[message.guild.id]['queue'].push({
            audio: audio,
            url: url,
            songName: info['videoDetails']['title'],
            author: message.author
        })

        sendEmbed(message.channel, {
            title: `Added to queue: ${info['videoDetails']['title']}`,
            color: '#ffff00',
            deleteTimeout: 5000,
        }) // end of sendEmbed()
        
        //return false 
    }

    private static async spotify(message: Message, client: Tau) {
        const spotifyURL = play.removePrefixAndCommandFromString(message.content, client.PREFIX)
        console.log(spotifyURL)
        const firstSearch: object = await getData(spotifyURL)
        if (firstSearch['tracks'] != undefined) {
            const playlistName = firstSearch['name']
            const tracks: object[] = await getTracks(spotifyURL)
            let trackUrls: string[] = []
            /*
            for (let i = 0; i < firstSearch['tracks']['items'].length; i++) {
                
                if (firstSearch['tracks']['items'][i]['track'] == null){} else trackUrls.push(firstSearch['tracks']['items'][i]['track']['external_urls']['spotify'])
            }
            
            */
            await play.spotifyPlaylist(message, client, tracks, playlistName)
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

    private static async spotifyPlaylist(message: Message, client: Tau, tracks: object[], playlistName: string) {
   
        sendEmbed(message.channel, {
            title: `Loading Spotify Playlist: ${playlistName}`,
            deleteTimeout: 5000
        })
        console.log('spotify playlist')
        console.log(tracks)

        let areExplicitSongs: boolean = false
        let playing: boolean = false
        for (let i = 0; i < tracks.length; i++) {
            // if the track is explicit, don't add it or play it. Trying to play an explicit track crashes the bot
            
            if (tracks[i] != null) if (!tracks[i]['explicit']) if (message.guild.me.voice.connection.dispatcher == null && playing == false) {
                console.log('dispatcher is null')
                const songData = await getYTLinkFromSpotifyLink(tracks[i]['external_urls']['spotify']) // change here
                
                client.queueMap[message.guild.id] = {
                    playing: {

                        url: songData['url'],
                        author: message.author,
                        audio: songData['audio'],
                        songName: songData['songName'],
                        playlistName: playlistName
                                    
                    },
                    queue: [],
                }

                playing = true
                
                await playAudio(songData['audio'], message.member.voice.channel, songData['url'], message)
            }                
            
            else {
                client.queueMap[message.guild.id]['queue'].push({
                   
                    url: tracks[i]['external_urls']['spotify'],
                    type: 'spotify',
                    author: message.author,
                    playlistName: playlistName
                })
                // add back later
                const length = client.queueMap[message.guild.id]['queue'].length

            }

            if (tracks[i]['explicit']) areExplicitSongs = true
            // play.loadAllSongs(message, client)
            
           
        }

        if (areExplicitSongs) sendEmbed(message.channel, {
            title: `This playlist has songs that are explicit, and cannot be accessed anonymously.`,
            color: defaultColor,
            deleteTimeout: 5000
        })

        /*
        for (let i = 0; i < tracks.length; i++) {
            const audio = ytdl(ytTracks[i])
            if (message.guild.me.voice.connection.dispatcher == null || message.guild.me.voice.connection.dispatcher == undefined) play.kwPlay(message, client, audio, ytTracks[i])           
            else play.kwQueueAdd(message, client, audio, ytTracks[i])
            
        }
        */



    }


    public async commandMain(message: Message, client: Tau) {
        const isYTLink = message.content.match('http(?:s?):\\/\\/(?:www\\.)?youtu(?:be\\.com\\/watch\?v=|\.be\\/)([\\w\\-\\_]*)(&(amp;)?‌​[\\w\\?‌​=]*)?')
        const re = /((open|play)\.spotify\.com\/)/
        const isSpotifyLink = re.test(play.removePrefixAndCommandFromString(message.content, client.PREFIX))
        try {
            if (isYTLink) play.yt(message, client)
            else if (isSpotifyLink) play.spotify(message, client)
            else play.kw(message, client)   
        }
        catch (err) {
            console.log(err)
        }
        

    }

    

    private static async handleNoVideoFound(message: Message) {
        sendEmbed(message.channel, {
            title: `No video results found, ${message.author.tag}.`,
            color: 'RED',
            deleteTimeout: 5000
        })

    }

    private static async loadSong(message: Message, client: Tau, song: object) {
            if (song['type'] == 'spotify') {
                const data: object = await getYTLinkFromSpotifyLink(song['url'])
                song['url'] = data['url']
                song['audio'] = data['audio']
                song['songName'] = data['songName']
                song['type'] = undefined
            }
    }
    
    private static async loadAllSongs(message: Message, client: Tau) {
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

    private static videoCannotBeAccessed(message: Message, client: Tau): void {
        play.sendEmbed(<TextChannel> message.channel, {
            title: `That video cannot be accessed anonymously, and is likely age-restricted, ${message.author.tag}.`,
            deleteTimeout: 5000
        })
    }
    
    

}
