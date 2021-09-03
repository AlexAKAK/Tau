import { MessageButton } from "discord-buttons"

export default {
    skip: function(button: MessageButton): boolean {
        const connection = button.message.channel.guild.me.voice.connection
        if (connection == null||connection == undefined) return true
        if (connection.dispatcher == null||connection.dispatcher == undefined) return true
        return false
    },
    queue: function(button: MessageButton): boolean {
        const connection = button.message.channel.guild.me.voice.connection
        if (connection == null||connection == undefined) return true
        if (connection.dispatcher == null||connection.dispatcher == undefined) return true
        return false    
    },
    restart: function(button: MessageButton): boolean {
        const connection = button.message.channel.guild.me.voice.connection
        if (connection == null||connection == undefined) return true
        if (connection.dispatcher == null||connection.dispatcher == undefined) return true
        return false
    },
    stop: function(button: MessageButton): boolean {
        const connection = button.message.channel.guild.me.voice.connection
        if (connection == null||connection == undefined) return true
        if (connection.dispatcher == null||connection.dispatcher == undefined) return true
        return false
    }
}