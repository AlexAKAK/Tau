
import { Message, TextChannel, NewsChannel, DMChannel, Embed, EmbedBuilder } from "discord.js"
import defaultColor from "../utility/embeds/defaultColor.js"
import errorColor from "../utility/embeds/errorColor.js"
import sendEmbed from './../utility/embeds/sendEmbed.js'

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
        let embed = new Embed()
        embed.setColor(errorColor)
        embed.setTitle(errMessage)
    }
    */

    sendErrMessage(channel: TextChannel|DMChannel|NewsChannel, message: string) {
        // message is a discord.message, kwargs is a dictionary
    
        let embed = new EmbedBuilder()
        /*if (kwargs['color'])*/ embed.setColor(errorColor)
        embed.setTitle(message)
    
        embed.setTimestamp()
        
     
        // sends the embed message, then returns a promise that resolves to the message.
        const sentMessagePromise = channel.send({embeds: [embed]})
        // if there's a deleteTimeout specified
        sentMessagePromise
        .then(message => {
            /*
            setTimeout(() => {
                if (!message.deleted) message.delete()
            }, 5000)
            */
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