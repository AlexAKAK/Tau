import { AudioPlayerStatus, createAudioPlayer, createAudioResource, getVoiceConnection, AudioPlayerState, PlayerSubscription} from "@discordjs/voice"
import { Message, StreamDispatcher, VoiceChannel, VoiceConnection } from "discord.js"
import dv from '@discordjs/voice'
import sendNowPlayingEmbed from './embeds/sendNowPlayingEmbed.js'
import ytdl from 'discord-ytdl-core'
import checkQueueThenHandle from './checkQueueThenHandle.js'

export default async function playAudio(audio: any, voiceChannel: VoiceChannel, url: string, message: Message) {
    
    const connection = getVoiceConnection(voiceChannel.guild.id)
    
    setTimeout(() => {
        const player = createAudioPlayer()
        player.play(createAudioResource(audio))
        connection.subscribe(player)
        connection.player = player
        
        // once the song is done playing, check the queue
        player.on(AudioPlayerStatus.Idle, () => {
                checkQueueThenHandle(message, connection)
        })

        

        
        

    }, 0) // used to be 5000
    
        
    // once the song has finished playing, handle the queue
    

    sendNowPlayingEmbed(url, message)
}