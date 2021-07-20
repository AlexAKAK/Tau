import Item from "../../interfaces/Item";
import emojis from "../../../../../utility/emojis";
import blockTypes from "../blockTypes";
import characterInterface from "../../interfaces/characterInterface";
import McGame from "../McGame";

export default class grass implements Item {
    miningDifficulty: 1
    blockType: blockTypes =  blockTypes.WALK_OVER
    x: number
    y: number

    setChoords (x: number, y: number): grass {
        this.x = x
        this.y = y
        return this
    }
    toString(): string {
        return emojis.greenSquare
    }
    use(): void {
        
    }
    mine(gameInstance: McGame): void {

    }
}
