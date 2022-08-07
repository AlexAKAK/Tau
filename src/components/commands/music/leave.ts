import { Message } from "discord.js";
import { LanguageServiceMode } from "typescript";
import Tau from "../../..";
import CommandClass from '../../classes/CommandClass.js'
//const {randomHi, randomBye} = require('./.././../utility/gifs')
import { getVoiceConnection } from '@discordjs/voice';

@leave.alias(['l'])

@leave.errorCheck([
    leave.CLIENT_NOT_IN_VC_ERR
])

export default class leave extends CommandClass {
    protected static commandCategory: string = 'music'
    protected static commandDescription: string = 'I leave the voice channel I\'m in'
    protected static commandSyntax: string = 'leave'

    public async commandMain(message: Message, client: Tau) {
        getVoiceConnection(message.guild.id).destroy()
        //message.react('👋')


        /*
        const sentMessage = await message.channel.send(randomBye())

        setTimeout(() => {
            sentMessage.delete()
        }, 5000)
        */

        console.log(client.getVoiceState(message.guild.id))
    }
}


