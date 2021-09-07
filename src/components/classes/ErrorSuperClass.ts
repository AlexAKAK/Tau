import { MessageButton } from "discord-buttons"
import { Message, TextChannel, NewsChannel, DMChannel, MessageEmbed } from "discord.js"
import defaultColor from "../utility/embeds/defaultColor"
import errorColor from "../utility/embeds/errorColor"
const sendEmbed = require('./../utility/embeds/sendEmbed')

export default abstract class ErrorClass {
    getCommandName(message: Message): string {
        const unCutCommand = message.content.split(' ')[0]
        const commandName = unCutCommand.substring(2, unCutCommand.length)

        return commandName
    }

    

    

    splitArgs(message: Message) {
        return message.content.split(' ')
    }

    /*
    sendErrMessage(channel: TextChannel | NewsChannel | DMChannel, errMessage: string) {
        let embed = new MessageEmbed()
        embed.setColor(errorColor)
        embed.setTitle(errMessage)
    }
    */

    sendErrMessage(channel: TextChannel|DMChannel|NewsChannel, message: string) {
        // message is a discord.message, kwargs is a dictionary
    
        let embed = new MessageEmbed()
        /*if (kwargs['color'])*/ embed.setColor(errorColor)
        embed.setTitle(message)
    
        embed.setTimestamp()
        
     
        // sends the embed message, then returns a promise that resolves to the message.
        const sentMessagePromise = channel.send(embed)
        // if there's a deleteTimeout specified
        sentMessagePromise
        .then(message => {
            setTimeout(() => {
                if (!message.deleted) message.delete()
            }, 5000)
        })




        return sentMessagePromise
    
        
    
    }
    

    
    abstract checkPresence(message: Message): boolean
    abstract standardHandle(message: Message): void
    

    //checkPresence(message) {}
    //standardHandle(message){}
    /*execute(message){
        if (this.checkPresence(message)) this.standardHandle(message)
    }*/

}