import { isThisTypeNode } from "typescript";
import emojis from "../../../../../utility/emojis";
import Item from "../../interfaces/Item";
import placeable from "../../interfaces/placeable";
import blockTypes from "../../enums/blockTypes";
import McGame from "../McGame";
import miningDifficultyEnum from "../../enums/miningDifficultyEnum";
import miningDifficulty from "../../enums/miningDifficultyEnum";
import grass from "./grass";

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