import { DMChannel, Message, TextChannel, MessageEmbed } from "discord.js"
import HydroCarbon from "../../.."

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

import currentgame from "../games/currentgame"
import stopgame from "../games/stopgame"
import mc from "../games/mc/mc"

import transcribe from "../../science/transcribe"
import translate from "../../science/translate"
import pt from "../../science/pt"

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
    stop,
    currentgame,
    stopgame,
    mc,
    transcribe,
    translate,
    pt
]


@help.alias(['h'])
export default class help extends CommandClass {
    
    public async commandMain(message: Message, client: HydroCarbon) {
        const args = help.splitArgsWithoutCommandCall(message)
        if (args.length == 0) help.noArgsMain(message, client)
        else help.argsMain(message, client)
    }

    private static async noArgsMain(message: Message, client: HydroCarbon): Promise<void> {
        const embed = new MessageEmbed()
        .setColor('GREEN')
        .setTimestamp()  
        commands.forEach(
            function(command: any){
                embed.addField(`${client.PREFIX}${command.commandSyntax}`, command.commandDescription, false)
            }
        )


        const sentMessage = await message.channel.send(embed)
        
        setTimeout(function() {
            if (!sentMessage['deleted']) sentMessage.delete()
        }, 10000)
    }

    private static async argsMain(message: Message, client: HydroCarbon): Promise<void> {
        const commandName = help.splitArgsWithoutCommandCall(message)[0]
        if (!help.checkIfCommandNameIsValid(commandName)) {
            help.sendEmbed(<TextChannel|DMChannel> message.channel, {
                title: `Invalid command name, ${message.member.nickname}.`,
                color: 'RED',
                deleteTimeout: 5000
            })
            return
        }
        
        const command: any = help.getCommand(help.splitArgsWithoutCommandCall(message)[0])
        const embed = new MessageEmbed()
        .setTimestamp()
        .setColor('GREEN')
        .addField(`Usage: ${command.commandSyntax}`, `Description: ${command.commandDescription}`, false)

        message.channel.send(embed)
        

        
    }

    private static checkIfCommandNameIsValid(commandName: string): boolean {
        let valid: boolean = false;
        commands.forEach(function(command: any) {
            if (command.name == commandName) valid = true
        })

        return valid
    }

    private static getCommand(commandName: string): Function {
        let command: Function = null
        commands.forEach(function(_command: any) {
            if (_command.name == commandName) command = _command
        })
        return command

    }

}

