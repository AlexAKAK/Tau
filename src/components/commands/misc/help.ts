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
import defaultColor from "../../utility/embeds/defaultColor"
import errorColor from "../../utility/embeds/errorColor"
import allCommands from "../../commandCategories/allCommands"
// all commands organized by category
import CommandCategory from "../../classes/CommandCategory"







@help.alias(['h'])
export default class help extends CommandClass {
    // all commands array
    private static commands: any[] = []
    

    //console.log(commands)


    private static categories: string[] = []
    
    
    
    public async commandMain(message: Message, client: HydroCarbon) {
        console.log(help.commands)
        for (let i = 0; i < allCommands.length; i++) {
                for (let j = 0; j < allCommands[i].commands.length; j++) {
                    help.commands.push(allCommands[i].commands[j])
                }
        }

        for (const category of allCommands) {
                help.categories.push(category.name)
            }



        const args = help.splitArgsWithoutCommandCall(message)
        if (args.length == 0) help.noArgsMain(message, client)
        else help.argsMain(message, client)
    }

    private static async noArgsMain(message: Message, client: HydroCarbon): Promise<void> {
    
        const embed = new MessageEmbed()
        .setTitle('\`\`\`To see available commands, type: ak!help <category/command>\`\`\`')
        .setColor(defaultColor)
        .setTimestamp()

        for (let i = 0; i < allCommands.length; i++) {
            
            //embed.addField(`\`\`\`${client.PREFIX}${allCommands[i].commandSyntax}\`\`\``, `\`\`\`${help.commands[i].commandCategory}: ${help.commands[i].commandDescription}\`\`\``, true)
            embed.addField(`\`\`\`${allCommands[i].name}\`\`\``, `\`\`\`${allCommands[i].description}\`\`\``, true)
            

        }
        


        const sentMessage = await message.channel.send(embed)
        
        setTimeout(function() {
            if (!sentMessage['deleted']) sentMessage.delete()
        }, 20000)
    }

    private static async argsMain(message: Message, client: HydroCarbon): Promise<void> {
     
        const arg = help.splitArgsWithoutCommandCall(message)[0].toLowerCase()
        if (help.categories.indexOf(arg) != -1) help.argsMainCategory(message, client, arg)
        else help.argsMainCommand(message, client)

    }
    private static async argsMainCategory(message: Message, client: HydroCarbon, category: string): Promise<void> {
        for (const _category of allCommands) 
        {
            if (_category.name == category) 
            {
                const embed = new MessageEmbed()
                embed.setTimestamp()
                embed.setColor(defaultColor)
                embed.setTitle(`\`\`\`Command Category: ${_category.name}\`\`\``)
                for (const command of _category.commands) {
                    embed.addField(`\`\`\`${client.PREFIX}${command.commandSyntax}\`\`\``, `\`\`\`${command.commandDescription}\`\`\``, true)
                }
                message.channel.send(embed)
            }
        }
    }

    private static async argsMainCommand(message: Message, client: HydroCarbon): Promise<void> {
        const commandName = help.splitArgsWithoutCommandCall(message)[0].toLowerCase()
        if (!help.checkIfCommandNameIsValid(commandName)) {
            help.sendEmbed(<TextChannel|DMChannel> message.channel, {
                title: `Invalid command name, ${message.author.tag}.`,
                color: errorColor,
                deleteTimeout: 5000
            })
            return
        }
        
        const command: any = help.getCommand(help.splitArgsWithoutCommandCall(message)[0])
        const embed = new MessageEmbed()
        .setTimestamp()
        .setColor(defaultColor)
        .addField(`\`\`\`Usage: ${command.commandSyntax}\`\`\``, `\`\`\`Description: ${command.commandDescription}\`\`\``, false)

        message.channel.send(embed)
        

        
    }

    private static checkIfCommandNameIsValid(commandName: string): boolean {
        let valid: boolean = false;
        help.commands.forEach(function(command: any) {
            if (command.name == commandName) valid = true
        })

        return valid
    }

    private static getCommand(commandName: string): Function {
        let command: Function = null
        help.commands.forEach(function(_command: any) {
            if (_command.name == commandName) command = _command
        })
        return command

    }

}

