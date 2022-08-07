import { isThisTypeNode } from "typescript";
import emojis from "../../../../../utility/emojis.js";
import Item from "../../interfaces/Item.js";
import placeable from "../../interfaces/placeable.js";
import blockTypes from "../../enums/blockTypes.js";
import McGame from "../McGame.js";
import miningDifficultyEnum from "../../enums/miningDifficultyEnum.js";
import miningDifficulty from "../../enums/miningDifficultyEnum.js";
import grass from "./grass.js";

export default class wood extends Item implements placeable {
    update(gameInstance: McGame): void {
        console.log('updating')
    }
    x: number
    y: number
    toString(): string {
        return emojis.brownSquare
    }
    use(gameInstance: McGame): void {
        const block = gameInstance.character.getBlockInFront()
        if (block == null) return
        gameInstance.grid[block.y][block.x] = new wood().setChoords(block.x, block.y)
        gameInstance.character.inventory.splice(Number(gameInstance.mostRecentMessage.content.split(' ')[1]), 1)
    }
    miningDifficulty: number = miningDifficultyEnum.STANDARD
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