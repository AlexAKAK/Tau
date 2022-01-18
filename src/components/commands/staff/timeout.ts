import { GuildMember, Message, MessageEmbed } from "discord.js";
import Tau from "../../..";
import CommandClass from "../../classes/CommandClass";
import defaultColor from "../../utility/embeds/defaultColor";
const sendEmbed = require("../../utility/embeds/sendEmbed");
@timeout.unStable
@timeout.errorCheck([
    timeout.MISSING_ARGS_ERR_METACLASS(5) // t!timeout <user> <time> <time unit> <reason>
])
export default class timeout extends CommandClass {

    protected static commandCategory: string = 'staff'
    protected static commandDescription: string = 'A user is timed out for a certain amount of time'
    protected static commandSyntax: string = 'timeout <user> <time> <time unit> <reason>'
    

    public async commandMain(message: Message, client: Tau): Promise<void> {
    if (message.member.id != message.guild.ownerId) {
        if (message.guild.me.roles.highest <= message.mentions.members.first().roles.highest) {
                sendEmbed(message.channel, {
                    title: 'I am not high enough to timeout this user',
                    color: defaultColor
                })
                return;
            }

            if (message.member.roles.highest <= message.mentions.members.first().roles.highest) {
                sendEmbed(message.channel, {
                    title: 'You are not high enough role to use this command against that user',
                    color: defaultColor
                })
                return;
            }
    }
    
    
    
    const args: string[] = message.content.split(" ").slice(1); // remove the call
    const member: GuildMember = message.mentions.members.first();
    const time: number = Number(args[1]);
    const timeUnit: string = args[2];
    const reason: string = message.content.split(" ").slice(4).join(" ");
    
    // time is in milliseconds
    let realTime: number = time;
    let realTimeUnit: string;
    // sets realTimeUnit to a string representing the time unit
    // sets realTime to the number of milliseconds
    switch (timeUnit) {
        case "s":
            realTimeUnit = "s";
            realTime *= 1000;
            break;
        case "m":
            realTimeUnit = "m";
            realTime *= 60000;
            break;
        case "h":
            realTimeUnit = "h";
            realTime *= 3600000;
            break;
        case "d":
            realTimeUnit = "d";
            realTime *= 86400000;
            break;
        default:
            realTimeUnit = "s";
            realTime *= 1000;
            break;
    }

    member.timeout(realTime, reason);
    const embed: MessageEmbed = new MessageEmbed()
    embed
    .setTitle("Timeout")
    .setDescription(`${member.user.tag} has been timed out for ${time} ${timeUnit} for ${reason}`)
    .setColor(defaultColor)
    .setTimestamp()
    message.channel.send({embeds: [embed]});
    }
    
}