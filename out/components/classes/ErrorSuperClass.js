"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const errorColor_1 = require("../utility/embeds/errorColor");
const sendEmbed = require('./../utility/embeds/sendEmbed');
class ErrorClass {
    getCommandName(message) {
        const unCutCommand = message.content.split(' ')[0];
        const commandName = unCutCommand.substring(3, unCutCommand.length);
        return commandName;
    }
    splitArgs(message) {
        return message.content.split(' ');
    }
    /*
    sendErrMessage(channel: TextChannel | NewsChannel | DMChannel, errMessage: string) {
        let embed = new MessageEmbed()
        embed.setColor(errorColor)
        embed.setTitle(errMessage)
    }
    */
    sendErrMessage(channel, message) {
        // message is a discord.message, kwargs is a dictionary
        let embed = new discord_js_1.MessageEmbed();
        /*if (kwargs['color'])*/ embed.setColor(errorColor_1.default);
        embed.setTitle(message);
        embed.setTimestamp();
        // sends the embed message, then returns a promise that resolves to the message.
        const sentMessagePromise = channel.send(embed);
        // if there's a deleteTimeout specified
        sentMessagePromise
            .then(message => {
            setTimeout(() => {
                if (!message.deleted)
                    message.delete();
            }, 5000);
        });
        return sentMessagePromise;
    }
}
exports.default = ErrorClass;
