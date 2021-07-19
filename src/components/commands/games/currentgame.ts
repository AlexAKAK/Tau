import { DMChannel, Message, TextChannel } from "discord.js";
import HydroCarbon from "../../..";
import CommandClass from "../../classes/CommandClass";

export default class currentgame extends CommandClass {
    protected static commandCategory: string = 'games'
    protected static commandDescription: string = 'The current game is displayed'
    protected static commandSyntax: string = 'currentgame'


    async commandMain(message: Message, client: HydroCarbon): Promise<void> {
        if (client.games.has(message.channel.id) == false || client.games.get(message.channel.id).active == false) {
            currentgame.sendEmbed(<TextChannel|DMChannel> message.channel, {
                title: `There are no games being played in this channel, ${message.author.tag}.`,
                color: 'YELLOW',
                deleteTimeout: 5000
            })
        }
        else {
            const game = client.games.get(message.channel.id)
            currentgame.sendEmbed(<TextChannel|DMChannel> message.channel, {
                title: `Playing: ${game.gameName}`,
                color: 'GREEN',
                deleteTimeout: 5000
            })
        }
        
    }
}