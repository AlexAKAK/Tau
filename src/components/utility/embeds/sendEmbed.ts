import { DMChannel, MessageEmbed, TextChannel } from 'discord.js'
import defaultColor from './defaultColor'
export {}
// Figure out the directory


function sendEmbed(channel: TextChannel, kwargs: any) {
    // message is a discord.message, kwargs is a dictionary

    let embed = new MessageEmbed()
    /*if (kwargs['color'])*/ /*embed.setColor(kwargs['color'])*/ embed.setColor(defaultColor)
    if (kwargs['title']) embed.setTitle(`${kwargs['title']}`)
    if (kwargs['image']) embed.setImage(`${kwargs['image']}`)

    // the elements in kwargs['fields'] are dictionaries
    if(kwargs['fields']) {

        for (let i = 0; i < kwargs['fields'].length; i++) {
            const name = kwargs['fields'][i]['name']
            const value = kwargs['fields'][i]['value']
            embed.addField(name, value, false)
        }
    }
    



    // default timeout for delete if 5 seconds. Can be changed or removed comepletely.
    //let deleteTimeout = 5000
    //if (kwargs['deleteTimeout']) {
    //    console.log('deleteTimeout')
    //    console.log(kwargs['deleteTimeout'])
    //    if (kwargs['deleteTimeout'] == false) deleteTimeout = undefined
    //    else if (typeof kwargs['deleteTimeout'] == Number) timeout = kwargs['deleteTimeout']
    

    embed.setTimestamp()
    
 
    // sends the embed message, then returns a promise that resolves to the message.
    const sentMessagePromise = channel.send(embed)
    // if there's a deleteTimeout specified
    sentMessagePromise
    .then((message) => {
        if (kwargs['deleteTimeout']) {
            setTimeout(function() {
                if(!message.deleted) message.delete()
            }, kwargs['deleteTimeout'])
        }
    })

    return sentMessagePromise

    

}


// possible candidate for a new sendEmbed function
/*
function sendEmbed(channel: TextChannel|DMChannel, kwargs: object) {
    let embed: string = '\`\`\`'

    if (kwargs['title']) embed += `${kwargs['title']}\n`



    embed += '\`\`\`' // add the end of the text block
}
*/

module.exports = sendEmbed