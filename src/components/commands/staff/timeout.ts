import { GuildMember, Message, MessageEmbed } from "discord.js";
import Tau from "../../..";
import CommandClass from "../../classes/CommandClass";
import defaultColor from "../../utility/embeds/defaultColor";
import errorColor from "../../utility/embeds/errorColor";
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
    //if (message.member.id != message.guild.ownerId) {

        const memberRolePosition = message.member.roles.highest.position
        const botRolePosition = message.guild.me.roles.highest.position
        const victim = message.mentions.members.first()
        if (victim == undefined) {
            return sendEmbed(message.channel, {
                title: "User not found",
                color: errorColor,
                
            })
        }
        const victimRolePosition = victim.roles.highest.position
        console.log('numbers!!')
        console.log(message.guild.me.roles.highest.position)
        console.log(message.mentions.members.first().roles.highest.position)
        
        if (botRolePosition < victimRolePosition) {
                sendEmbed(message.channel, {
                    title: 'I am not high enough to timeout this user',
                    color: errorColor
                })
                return;
            }

            if (memberRolePosition < victimRolePosition) {
                sendEmbed(message.channel, {
                    title: 'You are not high enough role to use this command against that user',
                    color: errorColor
                })
                return;
            }
        
    //}
    
    
    
    const args: string[] = message.content.split(" ").slice(1); // remove the call
    const member: GuildMember = message.mentions.members.first();
    const time: number = Number(args[1]);
    const timeUnit: string = args[2];
    const reason: string = message.content.split(" ").slice(4).join(" ");
    if (message.guild.ownerId == message.mentions.users.first().id) {
        sendEmbed(message.channel, {
            title: 'You cannot timeout the owner of the server',
            color: errorColor
        })
        return;
    }
    // time is in milliseconds
    let realTime: number = time;
    let realTimeUnit: string;
    // sets realTimeUnit to a string representing the time unit
    // sets realTime to the number of milliseconds
    switch (timeUnit) {
        case "s":
            realTimeUnit = "seconds";
            realTime *= 1000;
            break;
        case "m":
            realTimeUnit = "minutes";
            realTime *= 60000;
            break;
        case "h":
            realTimeUnit = "hours";
            realTime *= 3600000;
            break;
        case "d":
            realTimeUnit = "days";
            realTime *= 86400000;
            break;
        default:
            realTimeUnit = "seconds";
            realTime *= 1000;
            break;
    }
    
       member.timeout(realTime, reason)
       .then(() => {
        const embed: MessageEmbed = new MessageEmbed()
                embed
                .setTitle(`Timeout in ${message.guild.name}`)
                .setDescription(`${member.user.tag} has been timed out for ${time} ${realTimeUnit} for ${reason}`)
                .setColor(defaultColor)
                .setTimestamp()
                message.channel.send({embeds: [embed]});
                try {
                    embed.setDescription(`You have been timed out for ${time} ${realTimeUnit} for ${reason}`)
                    member.send({embeds: [embed]});
                }
                catch (err) {
                    console.log(err);
                }


       })
       .catch((err) => {
           console.log(err);
       })
        
          
   
      

    }
    
}