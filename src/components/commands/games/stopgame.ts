import { DMChannel, Message, TextChannel } from "discord.js";
import Tau from "../../..";
import CommandClass from "../../classes/CommandClass";
import ErrorClass from "../../classes/ErrorSuperClass";




@stopgame.errorCheck([stopgame.USER_NOT_PLAYING_A_GAME_ERR])
export default class stopgame extends CommandClass {
    protected static commandCategory: string = 'games'
    protected static commandDescription: string = 'Stops the current game'
    protected static commandSyntax: string = 'stopgame'


    async commandMain(message: Message, client: Tau): Promise<void> {
        console.log(client.games)
        const newGame = client.games.get(message.channel.id)
        newGame.active = false
        stopgame.sendEmbed(<TextChannel|DMChannel> message.channel, {
            title: `Stopped game: ${newGame.gameName}.`,
            color: 'GREEN',
            deleteTimeout: 5000
        })
    }

    

}

