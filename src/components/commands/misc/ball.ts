import { DMChannel, Message, Embed, TextChannel, EmbedBuilder, SlashCommandBuilder, REST, Routes, Guild, BaseInteraction, ChatInputCommandInteraction, SlashCommandSubcommandBuilder } from "discord.js";
import Tau from "../../..";
import CommandClass from "../../classes/CommandClass.js";
import defaultColor from "../../utility/embeds/defaultColor.js";
import fetch from "node-fetch"

/*
@ball.alias([
    '8ball'
])

@ball.errorCheck([
    ball.MISSING_ARGS_ERR_2
])
*/

export default class ball extends CommandClass {

    protected static commandCategory: string = 'misc'
    protected static commandDescription: string = 'Ask the magic 8 ball a question'
    protected static commandSyntax: string = 'ball <question>'


    public static slashCommand = new SlashCommandBuilder()
        .setName("ball")
        .setDescription("Answers a question!")
        .addStringOption(question =>
            question.setDescription("Your question")
            .setName("question")
            .setRequired(true)
        )
        
        
        
        


    

    async commandMain(interaction: ChatInputCommandInteraction, client: Tau): Promise<void> {
        const question: string = interaction.options.getString('question')
        
        let params = encodeURIComponent(question);
        let url = "https://8ball.delegator.com/magic/JSON/1" + params;

        const res: Response = await fetch(url)
        
        const resJson: object = await res.json()
        console.log(resJson)
        const response: string = resJson['magic']['answer']
        
        const embed = new EmbedBuilder();

        embed
        .setTitle('Magic 8 Ball')
    
        
        .addFields({
            name: 'Question',
            value: question,
            inline: false
        },
        {
            name: 'Response',
            value: response,
            inline: false
        })


        .setColor(defaultColor)
        .setTimestamp()
        
        interaction.reply({embeds: [embed]})
    
       
        
    }
}