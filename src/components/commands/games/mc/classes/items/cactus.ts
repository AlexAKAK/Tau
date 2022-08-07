import emojis from "../../../../../utility/emojis.js";
import blockTypes from "../../enums/blockTypes.js";
import miningDifficultyEnum from "../../enums/miningDifficultyEnum.js";
import Item from "../../interfaces/Item.js";
import McGame from "../McGame.js";
import grass from "./grass.js";

export default class cactus extends Item {
    [x: string]: any;
    toString(): string {
        return emojis.cactus
    }
    use(gameInstance: McGame): void {
        const block = gameInstance.character.getBlockInFront()
        if (block == null) return
        gameInstance.grid[block.y][block.x] = new cactus().setChoords(block.x, block.y)
        gameInstance.character.inventory.splice(Number(gameInstance.mostRecentMessage.content.split(' ')[1]), 1)
    }
    miningDifficulty: number = miningDifficultyEnum.STONE_SWORD
    blockType: blockTypes = blockTypes.NOT_WALK_OVER
    mine(gameInstance: McGame): void {
        gameInstance.character.inventory.push(new cactus())
        gameInstance.grid[this.y][this.x] = new grass()
    }
    update(gameInstance: McGame): void {
        // check if the character is thouching the cactus
        let isTouching: boolean = false
        if (gameInstance.character.getNorthBlock() == this) isTouching = true
        if (gameInstance.character.getEastBlock() == this) isTouching = true    
        if (gameInstance.character.getWestBlock() == this) isTouching = true    
        if (gameInstance.character.getSouthBlock() == this) isTouching = true

        if (isTouching) gameInstance.character.health--;
        
    }
    setChoords (x: number, y: number): cactus {
        this.x = x
        this.y = y
        return this
    }
    
}