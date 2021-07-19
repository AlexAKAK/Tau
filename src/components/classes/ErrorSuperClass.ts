import { Message, TextChannel, NewsChannel, DMChannel } from "discord.js"
const sendEmbed = require('./../utility/embeds/sendEmbed')

export default abstract class ErrorClass {
    getCommandName(message: Message) {
        const unCutCommand = message.content.split(' ')[0]
        const commandName = unCutCommand.substring(1, unCutCommand.length)

        return commandName
    }

    splitArgs(message: Message) {
        return message.content.split(' ')
    }

    
    sendErrMessage(channel: TextChannel | NewsChannel | DMChannel, errMessage: string) {
        sendEmbed(channel, {
            title: errMessage,
            color: '#FFA500',
            deleteTimeout: 5000

        })
    }

    
    abstract checkPresence(message: Message): boolean
    abstract standardHandle(message: Message): void
    

    //checkPresence(message) {}
    //standardHandle(message){}
    /*execute(message){
        if (this.checkPresence(message)) this.standardHandle(message)
    }*/

}