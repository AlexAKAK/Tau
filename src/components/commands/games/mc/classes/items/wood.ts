import emojis from "../../../../../utility/emojis";
import Item from "../../interfaces/Item";
import blockTypes from "../blockTypes";
import McGame from "../McGame";
import grass from "./grass";

export default class wood implements Item {
    x: number
    y: number
    toString(): string {
        return emojis.brownSquare
    }
    use(gameInstance: McGame): void {
        
    }
    miningDifficulty: number = 2
    blockType: blockTypes = blockTypes.WALK_OVER
    mine(gameInstance: McGame): void {
        gameInstance.grid[this.y][this.x] = new grass().setChoords(this.x, this.y)
        gameInstance.character.inventory.push(new wood())
    }
    setChoords (x: number, y: number): wood {
        this.x = x
        this.y = y
        return this
    }
    
}