import { Message } from "discord.js";
import Tau from "../../..";





export {}
import CommandClass from '../../classes/CommandClass.js'
const checkQueueThenHandle = require('./../../utility/checkQueueThenHandle')
const sendEmbed = require('./../../utility/embeds/sendEmbed')
const {red, lightBlue} = require('./../../utility/hexColors');
import {voice} from '@discordjs/voice'
import ConnectionWithPlayer from "../../classes/ConnectionWithPlayer.js";

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


@skip.alias(['s'])


@skip.errorCheck([
    skip.CLIENT_NOT_IN_VC_ERR, 
    skip.CLIENT_NOT_PLAYING_ANYTHING_ERR
])

export default class skip extends CommandClass {
    protected static commandCategory: string = 'music'
    protected static commandDescription: string = 'The current song is skipped'
    protected static commandSyntax: string = 'skip'
    
    
    public async commandMain(message: Message, client: Tau) {
        const connection = voice.getVoiceConnection(message.guild.id)
        //const dispatcher = connection.dispatcher
        sendEmbed(message.channel, {
            title: `Skipped ${client.queueMap[message.guild.id]['playing']['songName']}`,
            color: lightBlue,
            deleteTimeout: 5000,
        })
        // make the song not loop
        client.queueMap[message.guild.id]['playing']['loop'] = false
        const connectionP: ConnectionWithPlayer = connection as ConnectionWithPlayer
        connectionP.player.stop()

        // the player object changes, and it is not the right one ^^^^^^^
        
        //dispatcher.destroy()
        // **not sure if the next line is necessary** //
        //checkQueueThenHandle(message, connection)
    }
}

