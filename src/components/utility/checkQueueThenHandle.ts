import { Message } from "discord.js";
import getYTLinkFromSpotifyLink from "./spotify/getYTLinkFromSpotifyLink.js";

/* 
How handling a [!play <url>] will work
1. Check for errors, if err, stop and send the error message
2. Make the audio with await ytdl(url). Then, do one of 3 things.
    2a. If the bot isn't in a voice channel, join the voice channel and play the audio
    2b. If the bot is in a voice channel, push the audio object in a dictionary to the queueDict
    2c. If await ytdl(url) fails, send an error embed through .catch

3. Whenever the bot finishes playing something, call checkQueueThenHandle, which will
    repeat steps 2a and 2b
*/
export {}
const playAudio = require('./playAudio')
import ytdl = require('ytdl-core');


const sendNowPlayingEmbed = require('./embeds/sendNowPlayingEmbed')
import voice = require('@discordjs/voice');
import ConnectionWithPlayer from "../classes/ConnectionWithPlayer";
import { getVoiceConnection } from "@discordjs/voice";

async function checkQueueThenHandle(message: any, connection: voice.VoiceConnection) {
    const client = message.client
    const textChannel = message.channel
    // client: bot
    // connection: Discord.VoiceConection
    // textChannel: Discord.textChannel

    // if there is a next song in the voice channel's queue

    // if the song will loop

   
    if ((client.queueMap[message.guild.id] != undefined) && client.queueMap[message.guild.id]['playing']['loop'] === true) {
        const connectionP: ConnectionWithPlayer = getVoiceConnection(message.guild.id) as ConnectionWithPlayer
        const player = connectionP.player
        console.log('else if')
        const url = client.queueMap[message.guild.id]['playing']['url']
        // reset the audio by getting it from ytdl()
        const audio = ytdl(url)
        const source = voice.createAudioResource(audio)
        
        

        setTimeout(() => {
            player.play(source)
            /*
            player.on(voice.AudioPlayerStatus.Idle, () => {
                checkQueueThenHandle(message, connection)
            })
            */


        }, 2000)
        

        sendNowPlayingEmbed(url, message)
        
        client.queueMap[message.guild.id]['playing']['loop'] = false

    }
    
    else if ((client.queueMap[message.guild.id] != undefined) && client.queueMap[message.guild.id]['queue'].length == 0){
        console.log('else if 2')
        // if the queue is empty, stop the audio
        const connectionP: ConnectionWithPlayer = connection as ConnectionWithPlayer
        const player = connectionP.player
        player.stop()
        //connection.player = undefined
        client.queueMap[message.guild.id] = undefined
    }

    // if the song won't loop, and there is a next song in the queue
    else if ((client.queueMap[message.guild.id] != undefined) && client.queueMap[message.guild.id]['queue'].length > 0) {
        console.log('else if')
        if (client.queueMap[message.guild.id]['queue'][0]['type'] == 'spotify') {
            const songInfo = await getYTLinkFromSpotifyLink(client.queueMap[message.guild.id]['queue'][0]['url'])
            client.queueMap[message.guild.id]['queue'][0]['audio'] = songInfo['audio']
            client.queueMap[message.guild.id]['queue'][0]['url'] = songInfo['url'] // switch the spotify url to the youtube url
            client.queueMap[message.guild.id]['queue'][0]['songName'] = songInfo['songName']
            client.queueMap[message.guild.id]['queue'][0]['type'] = undefined
            // the song becomes like the rest, after being processed for the first time
        }
        const connectionP: ConnectionWithPlayer = connection as ConnectionWithPlayer
        const audio = client.queueMap[message.guild.id]['queue'][0]['audio']
        const url = client.queueMap[message.guild.id]['queue'][0]['url']

        const source = voice.createAudioResource(audio)
        const player = connectionP.player
        //connection.player = player
        player.play(source)
            connection.subscribe(player)
       /*
            player.on(voice.AudioPlayerStatus.AutoPaused, () => {
                checkQueueThenHandle(message, connection)
            }) 
            
        player.on(voice.AudioPlayerStatus.AutoPaused, () => {
            checkQueueThenHandle(message, connection)
        })
        */
    
        sendNowPlayingEmbed(url, message)
        // The leading song in the queue becomes the playing one. Then, the leading song gets removed from the queue
        client.queueMap[message.guild.id]['playing'] = client.queueMap[message.guild.id]['queue'][0]
        client.queueMap[message.guild.id]['queue'].shift() // removes the first element
    }
    // if the song won't loop and there isn't a next song in the queue
    else {
        console.log('there are no more songs in the queue')
        console.log('else')
        client.queueMap.delete(message.guild.id)
    }
    
}

module.exports = checkQueueThenHandle
