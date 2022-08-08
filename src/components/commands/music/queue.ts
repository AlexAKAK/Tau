import { Message, Embed, SlashCommandAssertions, SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";
//import { MessageButton } from "discord-buttons";
import Tau from "../../../index";
import CommandClass from '../../classes/CommandClass.js'
/*
import makeButton from "../../utility/buttons/makeButton";
import defaultColor from "../../utility/embeds/defaultColor";
import makeEmbed from "../../utility/embeds/makeEmbed";
import makeSkipButton from "../../utility/buttons/makeSkipButton";
import makeRestartButton from "../../utility/buttons/makeRestartButton";
import makeStopButton from "../../utility/buttons/makeStopButton";
import makeQueueButton from "../../utility/buttons/makeQueueButton";
*/

import sendEmbed from './../../utility/embeds/sendEmbed.js';

export {}

//@queue.alias(['q'])

@queue.errorCheck([
    queue.CLIENT_NOT_IN_VC_ERR, 
    queue.CLIENT_NOT_PLAYING_ANYTHING_ERR
])

export default class queue extends CommandClass {
    protected static commandCategory: string = 'music'
    protected static commandDescription: string = 'I show the current song queue'
    protected static commandSyntax: string = 'queue'


    public static slashCommand = new SlashCommandBuilder()
        .setName('queue')
        .setDescription('Displays the song queue')



    public async commandMain(interaction: ChatInputCommandInteraction, client: Tau) {

        const playing = client.queueMap[interaction.guild.id]['playing'] // dict
        const serverQueue = client.queueMap[interaction.guild.id]['queue'] // array

        
        // make fields
        // add the playing song, immediately
        let fields = [{
            name: 'Currently playing',
            value: playing['songName']
        }]
        
        // add the rest of the queue
        for (let i = 0; i < serverQueue.length; i++) {
            if (serverQueue[i]['songName'] != undefined)
                fields.push({
                    name: `${i + 2}:`,
                    value: serverQueue[i]['songName']
                })
            else fields.push({
                name: `${i + 2}:`,
                value: serverQueue[i]['playlistName']
            })
        }
        
        // if there is a leading element in serverQueue, change the name
        if (fields[0] != undefined && fields[0] != null) {
            fields[0]['name'] = 'Currently Playing:'
        }
        
       let text: string = '\`\`\`css\n'
       for (let i = 0; i < fields.length; i++) {
           text += `${fields[i].name}: ${fields[i].value}\n`
       }
       text = text.substring(0, 1990)
       text += '\`\`\`'

        //let buttons: MessageButton[] = []
        

        // buttons
       
        /*
        buttons.push(makeSkipButton())
        buttons.push(makeRestartButton())
        buttons.push(makeStopButton())
        buttons.push(makeQueueButton())
       */

        // working here
        /*
        const embed: Embed = makeEmbed({
            title: '** [Queue] **',
            color: defaultColor,
            fields: fields,
            deleteTimeout: 5000,
        })
        */
        /*
        message.channel.send(text, {
            buttons: buttons
        })
        */
       interaction.reply(text)
        return false
    }
}

