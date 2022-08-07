import emojis from "../../../../../utility/emojis.js";
import Item from "../../interfaces/Item.js";
import placeable from "../../interfaces/placeable.js";
import blockTypes from "../../enums/blockTypes.js";
import McGame from "../McGame.js";
import miningDifficultyEnum from "../../enums/miningDifficultyEnum.js";
import grass from "./grass.js";
import tree from "./tree.js";

export default class seed  extends Item implements placeable {
    x: number
    y: number
    growthProgress: number = 1
    toString(): string {
        return emojis.seed
    }
    use(gameInstance: McGame): void {
        console.log(gameInstance)
        const block = gameInstance.character.getBlockInFront()
        if (block.toString() != grass.prototype.toString()) return
        if (block == null) return
        gameInstance.grid[block.y][block.x] = this.setChoords(block.x, block.y)
        // remove the seed from the inventory
        gameInstance.character.inventory.splice(Number(gameInstance.mostRecentMessage.content.split(' ')[1]), 1)
        
    }
    miningDifficulty: number = miningDifficultyEnum.STANDARD

    blockType: blockTypes = -1
    mine(gameInstance: McGame): void {
        gameInstance.grid[this.y][this.x] = new grass().setChoords(this.x, this.y)
    }

    setChoords(x: number, y: number): seed {
        this.x = x
        this.y = y
        return this
    }
    update(gameInstance: McGame): void {
        console.log('updating')
        this.growthProgress++
        if (this.growthProgress == 9) {
            gameInstance.grid[this.y][this.x] = new tree(this.x, this.y)
        }
    }
    
}