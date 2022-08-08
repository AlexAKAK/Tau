import { ChatInputCommandInteraction, Message, SlashCommandBuilder } from "discord.js";
import Tau from "../../..";





export {}
import CommandClass from '../../classes/CommandClass.js'
import checkQueueThenHandle from './../../utility/checkQueueThenHandle';
import sendEmbed from './../../utility/embeds/sendEmbed.js';
import {getVoiceConnection} from '@discordjs/voice'
import ConnectionWithPlayer from "../../classes/ConnectionWithPlayer.js";
import replyEmbed from "../../utility/embeds/replyEmbed.js";

// C:/Users/alexk/Desktop/coding projects/bryson/bryson bot 9/src/components/utility/checkQueueThenHandle.js
/*async function skip(message) {
    // if no err
    if (checkErr(message) == false) {
        const connection = message.guild.me.voice.connection
        const dispatcher = connection.dispatcher
        sendEmbed(message.channel, {
            title: `Skipped ${message.client.queueMap[message.guild.me.voice.channel.id]['playing']['songName']}`,
            color: lightBlue,
            deleteTimeout: 5000,
        })
        // make the song not loop
        message.client.queueMap[message.guild.voice.connection.channel.id]['playing']['loop'] = false

        await dispatcher.destroy()
        checkQueueThenHandle(message, connection)
    }

    return checkErr(message)

}*/


//@skip.alias(['s'])


@skip.errorCheck([
    skip.CLIENT_NOT_IN_VC_ERR, 
    skip.CLIENT_NOT_PLAYING_ANYTHING_ERR
])

export default class skip extends CommandClass {
    protected static commandCategory: string = 'music'
    protected static commandDescription: string = 'The current song is skipped'
    protected static commandSyntax: string = 'skip'


    public static slashCommand = new SlashCommandBuilder()
        .setName('skip')
        .setDescription('Skips the current song')
    
    
    public async commandMain(interaction: ChatInputCommandInteraction, client: Tau) {
        const connection = getVoiceConnection(interaction.guild.id)
        
        //const dispatcher = connection.dispatcher
        replyEmbed(interaction, {
            title: `Skipped ${client.queueMap[interaction.guild.id]['playing']['songName']}`,
            color: '#ffff00',
            deleteTimeout: 5000,
        })
        // make the song not loop
        client.queueMap[interaction.guild.id]['playing']['loop'] = false
        const connectionP: ConnectionWithPlayer = connection as ConnectionWithPlayer
        connectionP.player.stop()

        // the player object changes, and it is not the right one ^^^^^^^
        
        //dispatcher.destroy()
        // **not sure if the next line is necessary** //
        //checkQueueThenHandle(message, connection)
    }
}

