import { Message, VoiceConnection } from "discord.js";
import getYTLinkFromSpotifyLink from "./spotify/getYTLinkFromSpotifyLink";

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
const ytdl = require('discord-ytdl-core');


const sendNowPlayingEmbed = require('./embeds/sendNowPlayingEmbed')

async function checkQueueThenHandle(message: any, connection: VoiceConnection) {
    const client = message.client
    const textChannel = message.channel
    // client: bot
    // connection: Discord.VoiceConection
    // textChannel: Discord.textChannel

    // if there is a next song in the voice channel's queue

    // if the song will loop
    if (client.queueMap[message.guild.id]['playing']['loop'] === true) {
        console.log('else if')
        const url = client.queueMap[message.guild.id]['playing']['url']
        // reset the audio by getting it from ytdl()
        const audio = ytdl(url)
        setTimeout(() => {
          const dispatcher = connection.play(audio, { type: 'opus', volume: 0.05 })
       
        dispatcher.on('finish', () => {
            checkQueueThenHandle(message, connection)
        })  


        }, 2000)
        

        sendNowPlayingEmbed(url, message)
        
        client.queueMap[message.guild.id]['playing']['loop'] = false
    }

    // if the song won't loop, and there is a next song in the queue
    else if (client.queueMap[message.guild.id]['queue'][0]) {
        console.log('else if')
        if (client.queueMap[message.guild.id]['queue'][0]['type'] == 'spotify') {
            const songInfo = await getYTLinkFromSpotifyLink(client.queueMap[message.guild.id]['queue'][0]['url'])
            client.queueMap[message.guild.id]['queue'][0]['audio'] = songInfo['audio']
            client.queueMap[message.guild.id]['queue'][0]['url'] = songInfo['url'] // switch the spotify url to the youtube url
            client.queueMap[message.guild.id]['queue'][0]['songName'] = songInfo['songName']
            client.queueMap[message.guild.id]['queue'][0]['type'] = undefined
            // the song becomes like the rest, after being processed for the first time
        }
    
        const audio = client.queueMap[message.guild.id]['queue'][0]['audio']
        const url = client.queueMap[message.guild.id]['queue'][0]['url']
        
        const dispatcher = connection.play(audio, {volume: 0.05})
            
        dispatcher.on('finish', () => {
            checkQueueThenHandle(message, connection)
        })
    
        sendNowPlayingEmbed(url, message)
        // The leading song in the queue becomes the playing one. Then, the leading song gets removed from the queue
        client.queueMap[message.guild.id]['playing'] = client.queueMap[message.guild.id]['queue'][0]
        client.queueMap[message.guild.id]['queue'].shift() // removes the first element
    }
    // if the song won't loop and there isn't a next song in the queue
    else {
        console.log('else')
        client.queueMap.delete(message.guild.id)
    }
    
}

module.exports = checkQueueThenHandle
