import { Message, MessageEmbed } from "discord.js";
import { MessageButton } from "discord-buttons";
import HydroCarbon from "../../../index";
import CommandClass from '../../classes/CommandClass'
import makeButton from "../../utility/buttons/makeButton";
import defaultColor from "../../utility/embeds/defaultColor";
import makeEmbed from "../../utility/embeds/makeEmbed";
import makeSkipButton from "../../utility/buttons/makeSkipButton";
import makeRestartButton from "../../utility/buttons/makeRestartButton";
import makeStopButton from "../../utility/buttons/makeStopButton";
import makeQueueButton from "../../utility/buttons/makeQueueButton";

const sendEmbed = require('./../../utility/embeds/sendEmbed');
const {lightBlue} = require('./../../utility/hexColors');
const {randomColor} = require('./.././../utility/hexColors')

export {}

@queue.alias(['q'])

@queue.errorCheck([
    queue.CLIENT_NOT_IN_VC_ERR, 
    queue.CLIENT_NOT_PLAYING_ANYTHING_ERR
])

export default class queue extends CommandClass {
    protected static commandCategory: string = 'music'
    protected static commandDescription: string = 'I show the current song queue'
    protected static commandSyntax: string = 'queue'


    public async commandMain(message: Message, client: HydroCarbon) {

        const playing = client.queueMap[message.guild.id]['playing'] // dict
        const serverQueue = client.queueMap[message.guild.id]['queue'] // array

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
                value: 'LOADING'
            })
        }

        // if there is a leading element in serverQueue, change the name
        if (fields[0] != undefined && fields[0] != null) {
            fields[0]['name'] = 'Currently Playing:'
        }

        let buttons: MessageButton[] = []
        

        buttons.push(makeSkipButton())
        buttons.push(makeRestartButton())
        buttons.push(makeStopButton())
        buttons.push(makeQueueButton())

        // working here
        const embed: MessageEmbed = makeEmbed({
            title: '** [Queue] **',
            color: defaultColor,
            fields: fields,
            deleteTimeout: 5000,
        })
        

        message.channel.send({
            buttons: buttons,
            embed: embed
        })

        return false
    }
}

