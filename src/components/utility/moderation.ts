import { Message, MessageEmbed } from "discord.js";
import Tau from "../..";
import analyzeText from "./analyzeText";
import textBlock from "./embeds/textBlock";

export default function moderation(client: Tau) {
    client.on('messageCreate', async (message: Message) => {
        perspectiveModeration(client, message)
        linkModeration(client, message)
        

    })
}


async function perspectiveModeration(client: Tau, message: Message): Promise<void> {
//if (message.author.id == message.guild.ownerId) return;
        if (message.content == '') return;
        const analysis = await analyzeText(message.content);
        if (messageShouldBeDeleted(analysis)) {
            try {
                //message.delete()
                //message.member.timeout(120000, reasonsToBeDeleted(analysis))

                //reactToMessage(message, analysis)
                respondToMessage(message, analysis)
            }
            catch (e) {
                console.log(e);
            }
        }
}


async function linkModeration(client: Tau, message: Message) {
   if (message.author.id == message.guild.ownerId) return;
    if (message.content.includes('discord.gg/'||'discordapp.com/invite/')) { //if it contains an invite link
        await deleteMessage(message)
        const embed: MessageEmbed = new MessageEmbed()
            .setTitle('Chat Moderation')
            .setColor('#ff0000')
            .setTimestamp()
            .setThumbnail(message.author.displayAvatarURL())
            .setDescription('Advertising is not allowed,' + message.author.toString() + ' Please do not post links to other servers.')
            
        message.channel.send({embeds: [embed]})
        
        message.member.timeout(120000, 'Advertising is not allowed! Please do not post links to other servers.')
        
    }
     
}

async function deleteMessage(message: Message): Promise<void> {
    try {
        message.delete()
    }
    catch (e) {
        console.log(e);
    }
}


function messageShouldBeDeleted(result: object): boolean {
    /*
    TOXICITY: false,
    SPAM: false,
    INCOHERENT: false,
    FLIRTATION: false,
    INSULT: false
    */

    return (result['TOXICITY'] || result['SPAM'] || result['FLIRTATION'] || result['INSULT'])
 
    
}

function reasonsToBeDeleted(result: object): string {
    let reasons: string[] = []
    if (result['TOXICITY']) reasons.push('Toxic')
    if (result['SPAM']) reasons.push('Spam')
    if (result['INCOHERENT']) reasons.push('Incoherent')
    if (result['FLIRTATION']) reasons.push('Flirting')
    if (result['INSULT']) reasons.push('Insult')
    return reasons.join(', ')
}
const emojiMap = {
    'FLIRTATION': '💋',
    'TOXICITY': '🧨',
    'INSULT': '👊',
    'INCOHERENT': '🤪',
    'SPAM': '🐟',
  };
function reactToMessage(message: Message, results: object) {
    if (results['TOXICITY']) message.react('🧨')
    if (results['SPAM']) message.react('🐟')
    if (results['INCOHERENT']) message.react('🤪')
    if (results['FLIRTATION']) message.react('💋')
    if (results['INSULT']) message.react('👊')
}

function respondToMessage(message: Message, results: object) {
    let content = ''
    if (results['TOXICITY']) content += '🧨Toxic\n'
    if (results['SPAM']) content += '🐟Spam\n'
    if (results['INCOHERENT']) content += '🤪Incoherent\n'
    if (results['FLIRTATION']) content += '💋Flirting\n'
    if (results['INSULT']) content += '👊Insult\n'

    if (content != '') {
        reply(message, content)
    }
}

function reply(message: Message, content: string): void {
    try {
        //message.reply(textBlock('⚠️' + content + '⚠️'))

        const embed: MessageEmbed = new MessageEmbed()
            .setTitle('Chat Moderation')
            .setColor('#ff0000')
            .setTimestamp()
            .setThumbnail(message.author.displayAvatarURL())
            .setDescription(textBlock(content))


        message.reply({embeds: [embed]})
    }
    catch (e) {
        console.log(e);
    }
}

