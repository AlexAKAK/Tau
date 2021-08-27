/*
Returns a promise for an object
the object has a property called items, which is an array of objects
each object within that array represents a search result, each having an id.
*/

const disbut = require('discord-buttons')
const discord = require('discord.js')
const { MessageButton } = require('discord.js-buttons')

const client = new discord.Client()

client.on('message', async message => {
    if (message.content == 'test') {
        const button = new MessageButton()
        button.setStyle('blurple')
        button.setLabel('skip')
        button.setID('skip')
        message.channel.send('button', {
            buttons: [
                button
            ]
        })
    }  
})


client.on('clickButton', async button => {
    if (button.id == 'skip') {
        button.channel.send('hi')
        button.reply.defer()
    }
})

client.login('ODI2MjQ3MTYwNDQ2MDU4NTA3.YGJsoQ.mykagyy_X6_xh5QpXrJbHmwn4Z0')
disbut(client)