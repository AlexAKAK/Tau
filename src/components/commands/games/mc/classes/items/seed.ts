import emojis from "../../../../../utility/emojis";
import Item from "../../interfaces/Item";
import blockTypes from "../blockTypes";
import McGame from "../McGame";
import grass from "./grass";
import tree from "./tree";

export default class seed implements Item {
    toString(): string {
        return emojis.seed
    }
    use(gameInstance: McGame): void {
        const block = gameInstance.character.getBlockInFront()
        if (block.toString() != grass.prototype.toString()) return
        if (block == null) return
        gameInstance.grid[block.y][block.x] = new tree(block.x, block.y)
        // remove the seed from the inventory
        gameInstance.character.inventory.splice(Number(gameInstance.mostRecentMessage.content.split(' ')[1]), 1)
        
    }
    miningDifficulty: number = -1
    blockType: blockTypes = -1
    mine(gameInstance: McGame): void {
    
    }

    setChoords(x: number, y: number) {
        
    }
    
}