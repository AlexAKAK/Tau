import { DMChannel, Message, TextChannel } from "discord.js";
import HydroCarbon from "../../..";
import CommandClass from "../../classes/CommandClass";
import ErrorClass from "../../classes/ErrorSuperClass";


class USER_NOT_PLAYING_A_GAME_ERR extends ErrorClass {
    checkPresence(message: any): boolean {
        // first check if a game exists. If it doesn't, return true
        // then, if a game exists, check if <gameobject>.active == false. If false, return true
        // else return false

        const gameExists: boolean = message.client.games.has(message.author.id)
        if (!gameExists) return true
        const gameObject = message.client.games.get(message.author.id)
        if (gameObject.active) return false
        else return true
    } 
    standardHandle(message: Message): void {
        this.sendErrMessage(message.channel, `You are not playing a game, ${message.author.tag}.`)
    }
    
}


@stopgame.errorCheck([USER_NOT_PLAYING_A_GAME_ERR])
export default class stopgame extends CommandClass {
    protected static commandCategory: string = 'games'
    protected static commandDescription: string = 'Stops the current game'
    protected static commandSyntax: string = 'stopgame'


    async commandMain(message: Message, client: HydroCarbon): Promise<void> {
        let currentGame = client.games.get(message.author.id)
        let newGame = currentGame
        // make the game inactive
        newGame.active = false

        stopgame.sendEmbed(<TextChannel|DMChannel> message.channel, {
            title: `Stopped game: ${newGame.gameName}.`,
            color: 'GREEN',
            deleteTimeout: 5000
        })
    }

    

}

