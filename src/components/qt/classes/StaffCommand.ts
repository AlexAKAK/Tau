import { Message, MessageEmbed } from "discord.js";
import Tau from "../../..";
import src from "../../..";
import qtData from "../qt data";
import CommandClass from "../../classes/CommandClass";
import errorColor from "../../utility/embeds/errorColor";

export default abstract class StaffCommand extends CommandClass {
    public abstract commandMainUndecorated(message: Message, client: Tau): Promise<void>
    public async commandMain(message: Message<boolean>, client: Tau): Promise<void> {
        if (message.member.roles.cache.has(qtData.roles['Moderator']))
            await this.commandMainUndecorated(message, client);
        else if (message.member.roles.cache.has(qtData.roles['Owner'])) 
            await this.commandMainUndecorated(message, client);

        else try {
            const embed: MessageEmbed = new MessageEmbed()
            embed.setColor(errorColor)
            embed.setTitle("You do not have permission to use this command.")
            embed.setDescription("You must have the Moderator role to use this command.")
            embed.setTimestamp()
            message.member.send({embeds: [embed]})

            
        }
        catch(err) {
            console.log(err)
        }
            
        
         
        
    }

}