import { DMChannel, Message, Embed, TextChannel, EmbedBuilder, ChatInputCommandInteraction } from 'discord.js'
import defaultColor from './defaultColor.js'

// Figure out the directory


export default function replyEmbed(interaction: ChatInputCommandInteraction, kwargs: any): void {
    // message is a discord.message, kwargs is a dictionary

    let embed = new EmbedBuilder()
    /*if (kwargs['color'])*/ /*embed.setColor(kwargs['color'])*/ embed.setColor(defaultColor)
    if (kwargs['title']) embed.setTitle(`${kwargs['title']}`)
    if (kwargs['image']) embed.setImage(`${kwargs['image']}`)

    // the elements in kwargs['fields'] are dictionaries
    if(kwargs['fields']) {

        for (let i = 0; i < kwargs['fields'].length; i++) {
            const name = kwargs['fields'][i]['name']
            const value = kwargs['fields'][i]['value']
            embed.addFields({
                name: name,
                value: value,
                inline: false
            })
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
    let sentMessagePromise: Promise<Message>
    // @ts-ignore
    /*
    if (kwargs['buttons']) sentMessagePromise = interaction.reply(embed, {
        buttons: [
            kwargs['buttons']
        ]
    })
    */
    if (!interaction.replied) interaction.reply({embeds: [embed]})
    else interaction.followUp({embeds: [embed]})

    

}


// possible candidate for a new sendEmbed function
/*
function sendEmbed(channel: TextChannel|DMChannel, kwargs: object) {
    let embed: string = '\`\`\`'

    if (kwargs['title']) embed += `${kwargs['title']}\n`



    embed += '\`\`\`' // add the end of the text block
}
*/