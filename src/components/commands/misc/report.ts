import { Message } from "discord.js";
import Tau from "../../..";
import CommandClass from "../../classes/CommandClass.js";

import sendEmbed from './../../utility/embeds/sendEmbed.js';


@report.errorCheck([report.MISSING_ARGS_ERR_3])
export default class report extends CommandClass {
    protected static commandCategory: string = 'misc'
    protected static commandDescription: string = 'report a user'
    protected static commandSyntax: string = 'report <user> <reason>'

    static MISSING_ARGS_ERR_3 = report.MISSING_ARGS_ERR_METACLASS(3)

    async commandMain(message: Message, client: Tau) {
        const args = report.splitArgsWithoutCommandCall(message)
        const playerName = args[0]
        let reason: string = ''
        for (let i = 1; i < args.length; i++) {
            reason = `${reason} ${args[i]}`
        }

        sendEmbed(message.channel, {
            title: `${playerName} has been reported for ${reason}. Staff will deal with this soon.`,
            color: 'RED',
        })
    }
}