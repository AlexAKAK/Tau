import { Message } from "discord.js"
import HydroCarbon from "../../.."


const {MessageEmbed} = require('discord.js')
//const CommandClass = require('../classes/CommandClass')
import CommandClass from '../../classes/CommandClass'

// import commands
import bal from "../currency/bal"
import hack from "../currency/hack"
import mine from "../currency/mine"
import walletcreate from "../currency/walletcreate"

import announce from "./announce"
import clear from "./clear"
import gif from "./gif"
import meme from "./meme"
import report from "./report"

import join from "../music/join"
import leave from "../music/leave"
import loop from "../music/loop"
import play from "../music/play"
import queue from "../music/queue"
import restart from "../music/restart"
import skip from "../music/skip"
import stop from "../music/stop"


const commands = [
    bal,
    hack,
    mine,
    walletcreate,
    announce,
    clear,
    gif,
    meme,
    report,
    join,
    leave,
    loop,
    play,
    queue,
    restart,
    skip,
    stop
]


@help.alias(['h'])

export default class help extends CommandClass {
    
    public async commandMain(message: Message, client: HydroCarbon) {
        const PREFIX: string = client.PREFIX
        const embed = new MessageEmbed()
        .setColor('GREEN')
        .setTimestamp()



        commands.forEach(
            function(command: any){
                embed.addField(command.commandSyntax, command.commandDescription, false)
            }
        )


        const sentMessage = await message.channel.send(embed)
        
        setTimeout(function() {
            if (!sentMessage['deleted']) sentMessage.delete()
        }, 10000)

        return false
    }
}

