import { Message, TextChannel } from "discord.js";
import Tau from "../../..";

import CommandClass from '../../classes/CommandClass.js'
import defaultColor from "../../utility/embeds/defaultColor.js";
import { CLIENT_NOT_IN_VC_ERR, PLAYING_SONG_ALREADY_LOOPING_ERR } from './../../classes/Errors.js';
import sendEmbed from './../../utility/embeds/sendEmbed.js';



@loop.errorCheck([
    loop.CLIENT_NOT_IN_VC_ERR 
    //loop.PLAYING_SONG_ALREADY_LOOPING_ERR
])


export default class loop extends CommandClass {
    protected static commandCategory: string = 'music'
    protected static commandDescription: string = 'the currently playing song is set to loop after completion'
    protected static commandSyntax: string = 'loop'
    
    public async commandMain(message: Message, client: Tau) {
        client.queueMap[message.guild.id]['playing']['loop'] = true
        sendEmbed(<TextChannel> message.channel, {
            title: `looping ${client.queueMap[message.guild.id]['playing']['songName']}`,
            color: defaultColor,
            deleteTimeout: 5000,
        }) 
    }
}


