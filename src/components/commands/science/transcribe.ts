import { DMChannel, Message, Embed, TextChannel, EmbedBuilder } from "discord.js";
import Tau from "../../..";
import CommandClass from "../../classes/CommandClass.js";
import defaultColor from "../../utility/embeds/defaultColor.js";



@transcribe.errorCheck([transcribe.MISSING_ARGS_ERR_METACLASS(2)])

export default class transcribe extends CommandClass {
    protected static commandCategory: string = 'science'
    protected static commandDescription: string = 'You transcribe an RNA strand'
    protected static commandSyntax: string = 'transcribe <RNA>'

    async commandMain(message: Message, client: Tau) {
        let DNA: string = transcribe.splitArgsWithoutCommandCall(message)[0]
        let RNA = DNA


        for (let i = 0; i < DNA.length; i++) {
            if (DNA.charAt(i) != 'a' && DNA.charAt(i) != 't' && DNA.charAt(i) != 'c' && DNA.charAt(i) != 'g') {
                transcribe.sendEmbed(<TextChannel|DMChannel>message.channel, {
                    title: `Invalid DNA strand provided, ${message.author.tag}.`,
                    color: 'RED',
                    deleteTimeout: 5000
                })
                return;

            }
        }


        
        console.log(DNA)

        RNA = RNA.replace(/a/g, 'u')
        RNA = RNA.replace(/t/g, 'a')
        RNA = RNA.replace(/c/g, 'x')
        RNA = RNA.replace(/g/g, 'c')
        RNA = RNA.replace(/x/g, 'g')

        

        const embed = new EmbedBuilder()
        embed.setColor(defaultColor)
        embed.addFields({
            name: 'DNA strand',
            value:DNA,
            inline:false
        })
        embed.addFields({
            name: 'mRNA transcript',
            value: RNA,
            inline: false
        })
        embed.setTimestamp()
        

        message.channel.send({embeds: [embed]})



    }
    
}

