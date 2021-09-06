import { Message, TextChannel } from "discord.js";
import Tau from "../../..";
import CommandClass from "../../classes/CommandClass";
import shuffleArray from "../../utility/shuffleArray";


@shuffle.errorCheck([
    shuffle.CLIENT_NOT_IN_VC_ERR,
    shuffle.CLIENT_NOT_PLAYING_ANYTHING_ERR,
])
export default class shuffle extends CommandClass {


    protected static commandCategory: string = 'music'
    protected static commandDescription: string = 'Shuffles the song queue'
    protected static commandSyntax: string = 'shuffle'

    public async commandMain(message: Message, client: Tau) {
        client.queueMap[message.guild.id]['queue'] = shuffleArray(client.queueMap[message.guild.id]['queue'])
        shuffle.sendEmbed(<TextChannel>message.channel, {
            title: `Shuffling Queue`,
            deleteTimeout: 5000
        })
    }
}