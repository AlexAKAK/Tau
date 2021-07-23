import { Guild, Message, MessageEmbed } from "discord.js";
import HydroCarbon from "../../..";
import CommandClass from "../../classes/CommandClass";


@announce.alias(['a'])
@announce.memberCooldown(60000)
@announce.errorCheck([announce.MISSING_ARGS_ERR_2])
export default class announce extends CommandClass {
    protected static commandCategory: string = 'misc'
    protected static commandDescription: string = 'You make an announcement'
    protected static commandSyntax: string = 'announce <message>'


    static MISSING_ARGS_ERR_2 = announce.MISSING_ARGS_ERR_METACLASS(2)


    async commandMain(message: Message, client: HydroCarbon): Promise<void> {

    

        const spaceIndex: number = message.content.indexOf(' ')
        const msg = message.content.substring(spaceIndex + 1)

    
        const embed = new MessageEmbed()
        embed
        .setColor('BLUE')
        .setDescription(msg)
        .setTitle(`Annoucement by ${message.member.nickname}`)
        .setTimestamp()




        message.channel.send(embed)













        //announce.dmEveryone(embed, message.guild)




         
    }
/*
    private static dmEveryone(content: string|MessageEmbed, guild: Guild) {
        guild.members.cache.forEach(member => {
            if (member == guild.me)
   
            member.user.send(content)
            
            

            
           
        })
    }
*/

  

}
