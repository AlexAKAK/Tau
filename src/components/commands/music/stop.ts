import { getVoiceConnection } from "@discordjs/voice"
import { ChatInputCommandInteraction, Message, SlashCommandBuilder } from "discord.js"
import Tau from "../../.."


import sendEmbed from './../../utility/embeds/sendEmbed.js'
import CommandClass from '../../classes/CommandClass.js'
import ConnectionWithPlayer from "../../classes/ConnectionWithPlayer.js"
import replyEmbed from "../../utility/embeds/replyEmbed.js"
 

@stop.errorCheck([
    stop.CLIENT_NOT_IN_VC_ERR, 
    stop.CLIENT_NOT_PLAYING_ANYTHING_ERR
])

export default class stop extends CommandClass { 
    protected static commandCategory: string = 'music'
    protected static commandDescription: string = 'The bot stops playing songs and the queue is cleared'
    protected static commandSyntax: string = 'stop'


    public static slashCommand = new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Stops playing all songs')

    
    public async commandMain(interaction: ChatInputCommandInteraction, client: Tau) {

            // clear the server's queue
            client.queueMap.delete(interaction.guild.id)
            const connectionP: ConnectionWithPlayer = getVoiceConnection(interaction.guild.id) as ConnectionWithPlayer
            connectionP.player.stop()
            // send the embed
            replyEmbed(interaction, {
                color: '#ffff00',
                title: `I stopped playing.`,
                deleteTimeout: 5000,
            })
    
            return false
            
            
        
        
    }
}


