import Item from "../../interfaces/Item";
import emojis from "../../../../../utility/emojis";
import blockTypes from "../blockTypes";
import characterInterface from "../../interfaces/characterInterface";
import McGame from "../McGame";

export default class stone implements Item {
    miningDifficulty: 2
    blockType: blockTypes =  blockTypes.WALK_OVER
    x: number
    y: number

    setChoords (x: number, y: number): stone {
        this.x = x
        this.y = y
        return this
    }

    toString(): string {
        return emojis.blackSquare
    }
    use(gameInstance: McGame): void {
        
    }
    mine(gameInstance: McGame): void {

    }
    update(gameInstance: McGame): void {
        console.log('updating')
    }
}