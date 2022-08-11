import { ChatInputCommandInteraction, EmbedBuilder } from "discord.js";
import CommandClass from "../../../classes/CommandClass.js";
import errorColor from "../../../utility/embeds/errorColor.js";

export default abstract class InteractionCommand extends CommandClass {
    static async getGif(action: string) {
        const res = await fetch(`https://api.otakugifs.xyz/gif?reaction=${action}&format=gif`)
        const data: object = await res.json()
        const gif: string = data['url']
        console.log('gif')

        return gif
    }


    static async cant(interaction: ChatInputCommandInteraction) {
        const embed = new EmbedBuilder()
            .setDescription("❌ You can't do that!")
            .setColor(errorColor)
            
        interaction.reply({embeds: [embed], ephemeral: true})
    }
}