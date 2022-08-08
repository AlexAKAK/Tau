import { ChatInputCommandInteraction, Message, SlashCommandBuilder, User, userMention } from "discord.js";
import Tau from "../../..";
import CommandClass from "../../classes/CommandClass.js";
import replyEmbed from "../../utility/embeds/replyEmbed.js";

import sendEmbed from './../../utility/embeds/sendEmbed.js';

/*
@report.errorCheck([report.MISSING_ARGS_ERR_3])
*/
export default class report extends CommandClass {
    protected static commandCategory: string = 'misc'
    protected static commandDescription: string = 'report a user'
    protected static commandSyntax: string = 'report <user> <reason>'


    public static slashCommand = new SlashCommandBuilder()
        .setName("report")
        .setDescription("Report a user (joke)")
        .addUserOption(user => 
            user.setDescription('The user to report')
            .setName('user')
        )
        .addStringOption(reason =>
            reason.setName('reason')
            .setDescription('Reason for reporting')    
        )

        

    static MISSING_ARGS_ERR_3 = report.MISSING_ARGS_ERR_METACLASS(3)

    async commandMain(interaction: ChatInputCommandInteraction, client: Tau) {
        
        const user: User = interaction.options.getUser('user')
        const reason: string = interaction.options.getString('reason')

        replyEmbed(interaction, {
            title: `${user.tag} has been reported for ${reason}. Staff will deal with this soon.`,
            color: 'RED',
        })
    }
}


