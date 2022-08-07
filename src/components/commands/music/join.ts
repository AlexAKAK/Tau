import { Message } from "discord.js";
import Tau from "../../..";
import CommandClass from '../../classes/CommandClass.js'
const {randomHi, randomBye} = require('./.././../utility/gifs')
import { joinVoiceChannel } from '@discordjs/voice';

@join.alias(['j'])

@join.errorCheck([
    join.MEMBER_NOT_IN_VC_ERR, 
    join.CLIENT_ALREADY_IN_VC_ERR
])

export default class join extends CommandClass {
    protected static commandCategory: string = 'music'
    protected static commandDescription: string = 'I join the voice channel you are in'
    protected static commandSyntax: string = 'join'

    async commandMain(message: Message, client: Tau) {
        //message.member.voice.channel.join()
        const connection = joinVoiceChannel({
            channelId: message.member.voice.channel.id,
            guildId: message.guild.id,
            adapterCreator: message.guild.voiceAdapterCreator,
        });

        // reinitialize the queue
        client.queueMap[message.guild.id] = undefined

        
        
    }   
}

