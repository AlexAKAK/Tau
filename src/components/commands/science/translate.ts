import { DiscordAPIError, DMChannel, Message, MessageEmbed, TextChannel } from "discord.js";
import mRNAGeneTranscript from '../../classes/genetics/mRNAGeneTranscript.js'
import CommandClass from "../../classes/CommandClass.js";
import aminoAcidSymbolToName from "../../classes/genetics/aminoAcidSymbolToName.js";
import Tau from "../../..";

@translate.errorCheck(translate.MISSING_ARGS_ERR_METACLASS(2))

export default class translate extends CommandClass {
    protected static commandCategory: string = 'science'
    protected static commandDescription: string = 'You translate a DNA strand'
    protected static commandSyntax: string = 'translate <DNA>'
    async commandMain(message: Message, client: Tau) {
        const seq = translate.splitArgsWithoutCommandCall(message )[0]
        
        const mRNA = new mRNAGeneTranscript(seq);
        let translationWithNames: string[] = [];


        if (!mRNA.valid) {
            translate.sendEmbed(<TextChannel|DMChannel>message.channel, {
                title: `Invalid mRNA transcript provided, ${message.author.tag}.`,
                color: 'RED',
                deleteTimeout: 5000
            })
            return;
        }

        translationWithNames = mRNA.aminoAcidStrand
        for (let i = 0; i < translationWithNames.length; i++) {
            const symbol = translationWithNames[i]
            translationWithNames[i] = aminoAcidSymbolToName[symbol]
        }

        const embed = new MessageEmbed()
        embed.setColor('BLUE')
        embed.addField('mRNA transcript', mRNA.baseSequence, false),
        embed.addField('Polypeptide chain', String(mRNA.aminoAcidStrand), false)
        embed.setTimestamp()

        message.channel.send({embeds: [embed]})



    }
}