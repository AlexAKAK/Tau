import { DMChannel, Message, TextChannel, Embed, EmbedBuilder } from "discord.js"
import Tau from "../../.."

//const CommandClass = require('../classes/CommandClass')
import CommandClass from '../../classes/CommandClass.js'
import defaultColor from "../../utility/embeds/defaultColor.js"
import errorColor from "../../utility/embeds/errorColor.js"
import allCommands from "../../commandCategories/allCommands.js"
//const pictures = require('./../../../../data/pictures')
const darkThumbnail = 'https://i.ibb.co/RNpxfVg/bot-logo-for-embed.png'



@help.alias(['h'])
export default class help extends CommandClass {
    // all commands array
    private static commands: any[] = []
    

    //console.log(commands)


    private static categories: string[] = []
    
    
    
    public async commandMain(message: Message, client: Tau) {
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

    private static async noArgsMain(message: Message, client: Tau): Promise<void> {
    
        const embed = new EmbedBuilder()
        .setTitle(`\`\`\`To see available commands, type: ${client.PREFIX}help <category/command>\`\`\``)
        .setColor(defaultColor)
        .setTimestamp()
        .setThumbnail(darkThumbnail)

        for (let i = 0; i < allCommands.length; i++) {
            
            //embed.addField(`\`\`\`${client.PREFIX}${allCommands[i].commandSyntax}\`\`\``, `\`\`\`${help.commands[i].commandCategory}: ${help.commands[i].commandDescription}\`\`\``, true)
            embed.addFields({
                name: `\`\`\`${allCommands[i].name}\`\`\``,
                value: `\`\`\`${allCommands[i].description}\`\`\``,
                inline: true
            })
            

        }
        


        const sentMessage = await message.channel.send({embeds: [embed]})
        
        
    }

    private static async argsMain(message: Message, client: Tau): Promise<void> {
     
        const arg = help.splitArgsWithoutCommandCall(message)[0].toLowerCase()
        if (help.categories.indexOf(arg) != -1) help.argsMainCategory(message, client, arg)
        else help.argsMainCommand(message, client)

    }
    private static async argsMainCategory(message: Message, client: Tau, category: string): Promise<void> {
        for (const _category of allCommands) 
        {
            if (_category.name == category) 
            {
                const embed = new EmbedBuilder()
                embed.setTimestamp()
                embed.setColor(defaultColor).setThumbnail(darkThumbnail)
                embed.setTitle(`\`\`\`Command Category: ${_category.name}\`\`\``)
                for (const command of _category.commands) {
                    embed.addFields({
                        name: `\`\`\`${client.PREFIX}${command.commandSyntax}\`\`\``,
                        value: `\`\`\`${command.commandDescription}\`\`\``,
                        inline: true
                    })
                }
                message.channel.send({embeds: [embed]})
            }
        }
    }

    private static async argsMainCommand(message: Message, client: Tau): Promise<void> {
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
        const embed = new EmbedBuilder()
        .setTimestamp()
        .setColor(defaultColor).setThumbnail(darkThumbnail)
        .addFields({
            name: `\`\`\`Usage: ${command.commandSyntax}\`\`\``,
            value: `\`\`\`Description: ${command.commandDescription}\`\`\``,
            inline: false

        })

        message.channel.send({embeds: [embed]})
        //

        
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

