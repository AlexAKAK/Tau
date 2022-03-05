import { Message, MessageEmbed } from "discord.js";
import Tau from "../../..";
import CommandClass from "../../classes/CommandClass";
import StaffCommand from "../../qt/classes/StaffCommand";
import defaultColor from "../../utility/embeds/defaultColor";
const rulesList = require('./../../../../data/rules')

/**
 * Be respectful, civil, and welcoming.
No inappropriate or unsafe content.
Do not misuse or spam in any of the channels.
Do not join the server to promote your content.
Any content that is NSFW is not allowed under any circumstances.
Do not buy/sell/trade/give away anything.
Do not use the server as a dating server.
The primary language of this server is English.
Discord names and avatars must be appropriate.
Spamming in any form is not allowed.
Controversial topics such as religion or politics are not allowed.
Do not attempt to bypass any blocked words.
Don’t ping without legitimate reasoning behind them.
Alternate accounts are not allowed under any circumstances.
Catfishing and any sort of fake identities are forbidden.
No Discord server invite links or codes.
Do not advertise without permission.
Do not role-play within the server.
Raiding is not allowed.
Anything to target specific groups/individuals is prohibited.
No major spoilers from any anime, movie, tv-show, or games on public channels.
Please do not mic spam.
Do not record voice channel conversations.
Avoid topics regarding banned members.
Remain on topic and use channels correctly.
 */
export default class rules extends StaffCommand {
    protected static commandCategory: string = 'staff'
    protected static commandDescription: string = 'Prints the rules'
    protected static commandSyntax: string = 'rules'
    public async commandMainUndecorated(message: Message<boolean>, client: Tau): Promise<void> {
        const embed: MessageEmbed = new MessageEmbed()
  
        .setTitle("Rules")
        .setColor(defaultColor)
        .setTimestamp()
        for (let i = 0; i < rulesList.length; i++) {
            embed.addField(`Rule ${i + 1}`, rulesList[i])
        }
        
        

        
        

        message.channel.send({embeds: [embed]})
    }
    
}