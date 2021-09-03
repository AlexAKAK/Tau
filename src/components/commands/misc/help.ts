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
import yt from "./yt"
import ytchannel from "./ytchannel"
import shuffle from "../music/shuffle"

/*
// utilities
import getDirectories from "../../utility/getDirectories"
const path = require('path')

// each folder for a command categorys
const commandCategories: string[] = getDirectories(`${__dirname}/../`)
let commandsByCategory: object = {}
// load each command into the correct category


for (let i = 0; i < commandCategories.length; i++) {
    let commandsForThisCategory: string[] = getDirectories(`${__dirname}/../${commandCategories[i]}`)
    let commandClassArray: Function[] = [];
    
    for (let j = 0; j < commandsForThisCategory.length; j++) {
        commandClassArray.push(require(`${__dirname}/../${commandCategories[i]}/${commandsForThisCategory[j]}`))
    }

    // add the commands to the object
    commandsByCategory[commandCategories[i]] = commandClassArray
}

const miscCommands: string[] = getDirectories(path.resolve(__dirname, './../misc'))

*/
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
    shuffle,
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
    pt,
    yt,
    ytchannel
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
                embed.addField(`\`\`\`${client.PREFIX}${command.commandSyntax}\`\`\``, `\`\`\`${command.commandCategory}: ${command.commandDescription}\`\`\``, true)
            }
        )


        const sentMessage = await message.channel.send(embed)
        
        setTimeout(function() {
            if (!sentMessage['deleted']) sentMessage.delete()
        }, 20000)
    }

    private static async argsMain(message: Message, client: HydroCarbon): Promise<void> {
        const commandName = help.splitArgsWithoutCommandCall(message)[0]
        if (!help.checkIfCommandNameIsValid(commandName)) {
            help.sendEmbed(<TextChannel|DMChannel> message.channel, {
                title: `Invalid command name, ${message.author.tag}.`,
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

