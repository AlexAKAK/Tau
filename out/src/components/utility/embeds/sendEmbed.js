"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
// Figure out the directory
function sendEmbed(channel, kwargs) {
    // message is a discord.message, kwargs is a dictionary
    let embed = new discord_js_1.MessageEmbed();
    if (kwargs['color'])
        embed.setColor(kwargs['color']);
    if (kwargs['title'])
        embed.setTitle(`${kwargs['title']}`);
    if (kwargs['image'])
        embed.setImage(`${kwargs['image']}`);
    // the elements in kwargs['fields'] are dictionaries
    if (kwargs['fields']) { ////////////////////////////////////////////////////////////////
        for (let i = 0; i < kwargs['fields'].length; i++) {
            const name = kwargs['fields'][i]['name'];
            const value = kwargs['fields'][i]['value'];
            embed.addField(name, value, false);
        }
    }
    // default timeout for delete if 5 seconds. Can be changed or removed comepletely.
    //let deleteTimeout = 5000
    //if (kwargs['deleteTimeout']) {
    //    console.log('deleteTimeout')
    //    console.log(kwargs['deleteTimeout'])
    //    if (kwargs['deleteTimeout'] == false) deleteTimeout = undefined
    //    else if (typeof kwargs['deleteTimeout'] == Number) timeout = kwargs['deleteTimeout']
    embed.setTimestamp();
    // sends the embed message, then returns a promise that resolves to the message.
    const sentMessagePromise = channel.send(embed);
    // if there's a deleteTimeout specified
    sentMessagePromise
        .then((message) => {
        if (kwargs['deleteTimeout']) {
            setTimeout(function () {
                if (!message.deleted)
                    message.delete();
            }, kwargs['deleteTimeout']);
        }
    });
    return sentMessagePromise;
}
module.exports = sendEmbed;
