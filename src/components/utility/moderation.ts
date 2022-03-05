import { Message } from "discord.js";
import Tau from "../..";
import analyzeText from "./analyzeText";

export default function moderation(client: Tau) {
    client.on('messageCreate', async (message: Message) => {
        if (message.author.id == message.guild.ownerId) return;
        if (message.content == '') return;
        const analysis = await analyzeText(message.content);
        if (messageShouldBeDeleted(analysis)) {
            try {
                message.delete()
                //message.member.timeout(120000, reasonsToBeDeleted(analysis))

                //reactToMessage(message, analysis)
            }
            catch (e) {
                console.log(e);
            }
        }
        

    })
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
    //if (results['INCOHERENT']) message.react('🤪')
    //if (results['FLIRTATION']) message.react('💋')
    //if (results['INSULT']) message.react('👊')
}

