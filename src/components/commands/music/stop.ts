import { getVoiceConnection } from "@discordjs/voice"
import { Message } from "discord.js"
import Tau from "../../.."


import sendEmbed from './../../utility/embeds/sendEmbed.js'
import CommandClass from '../../classes/CommandClass.js'
import ConnectionWithPlayer from "../../classes/ConnectionWithPlayer.js"
 

@stop.errorCheck([
    stop.CLIENT_NOT_IN_VC_ERR, 
    stop.CLIENT_NOT_PLAYING_ANYTHING_ERR
])

export default class stop extends CommandClass { 
    protected static commandCategory: string = 'music'
    protected static commandDescription: string = 'The bot stops playing songs and the queue is cleared'
    protected static commandSyntax: string = 'stop'

    
    public async commandMain(message: Message, client: Tau) {

            // clear the server's queue
            client.queueMap.delete(message.guild.id)
            const connectionP: ConnectionWithPlayer = getVoiceConnection(message.guild.id) as ConnectionWithPlayer
            connectionP.player.stop()
            // send the embed
            sendEmbed(message.channel, {
                color: '#ffff00',
                title: `I stopped playing.`,
                deleteTimeout: 5000,
            })
    
            return false
            
            
        
        
    }
}


