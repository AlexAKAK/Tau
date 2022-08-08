import { ChatInputCommandInteraction, Message, SlashCommandBuilder } from "discord.js";
import Tau from "../../..";

import TenorModule from 'tenorjs';

///egaegaegaegaegegaeaegaegaeg

const Tenor = TenorModule.client({
    "Key": 'C6NWL8O6EVFW', // https://tenor.com/developer/keyregistration
    "Filter": "off", // "off", "low", "medium", "high", not case sensitive
    "Locale": "en_US", // Your locale here, case-sensitivity depends on input
    "MediaFilter": "minimal", // either minimal or basic, not case sensitive
    "DateFormat": "D/MM/YYYY - H:mm:ss A" // Change this accordingly
});

import CommandClass from '../../classes/CommandClass.js'

/*
@gif.errorCheck([
    gif.MISSING_ARGS_ERR_2
])
*/


export default class gif extends CommandClass {
    protected static commandCategory: string = 'misc'
    protected static commandDescription: string = 'A gif is sent into the chat'
    protected static commandSyntax: string = 'gif <search query>'



    public static slashCommand = new SlashCommandBuilder()
        .setName("gif")
        .setDescription("Sends a gif")
        .addStringOption(query =>
            query.setDescription("Your query")
            .setName("query")
            .setRequired(true)
        )

    //static fetch = require('node-fetch')
    static MISSING_ARGS_ERR_2 = gif.MISSING_ARGS_ERR_METACLASS(2)

    public async commandMain(interaction: ChatInputCommandInteraction, client: Tau) {
        


        const keywords = interaction.options.getString('query')

        

                const results = await Tenor.Search.Query(keywords, "1")
                
                
                results.forEach(post => {
                    interaction.reply(post['itemurl'])
                    console.log(post['itemurl'])
                });
                
    }
}

