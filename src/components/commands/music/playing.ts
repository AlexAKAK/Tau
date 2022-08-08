import { ChatInputCommandInteraction, Message, SlashCommandBuilder } from "discord.js";
import Tau from "../../..";
import src from "../../..";
import CommandClass from "../../classes/CommandClass.js";
import sendNowPlayingEmbed from './../../utility/embeds/sendNowPlayingEmbed.js';

@playing.errorCheck([
    playing.CLIENT_NOT_PLAYING_ANYTHING_ERR
])

export default class playing extends CommandClass {
    
    protected static commandCategory: string = 'music'
    protected static commandDescription: string = 'Shows the current song'
    protected static commandSyntax: string = 'playing'


    public static slashCommand = new SlashCommandBuilder()
        .setName('playing')
        .setDescription("Displays the current song")

    
    public async commandMain(interaction: ChatInputCommandInteraction, client: Tau): Promise<void> {
        sendNowPlayingEmbed(client.queueMap[interaction.guild.id].playing.url, interaction);
    }
    
}
