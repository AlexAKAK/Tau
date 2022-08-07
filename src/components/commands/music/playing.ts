import { Message } from "discord.js";
import Tau from "../../..";
import src from "../../..";
import CommandClass from "../../classes/CommandClass.js";
const sendNowPlayingEmbed = require('./../../utility/embeds/sendNowPlayingEmbed.js');

@playing.errorCheck([
    playing.CLIENT_NOT_PLAYING_ANYTHING_ERR
])

export default class playing extends CommandClass {
    
    protected static commandCategory: string = 'music'
    protected static commandDescription: string = 'Shows the current song'
    protected static commandSyntax: string = 'playing'
    
    public async commandMain(message: Message, client: Tau): Promise<void> {
        sendNowPlayingEmbed(client.queueMap[message.guild.id].playing.url, message);
    }
    
}
