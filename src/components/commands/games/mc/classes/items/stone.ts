import Item from "../../interfaces/Item.js";
import emojis from "../../../../../utility/emojis.js";
import blockTypes from "../../enums/blockTypes.js";
import characterInterface from "../characterClass.js";
import McGame from "../McGame.js";
import miningDifficultyEnum from "../../enums/miningDifficultyEnum.js";
import placeable from "../../interfaces/placeable.js";

export default class stone extends Item implements placeable {
    miningDifficulty: number = miningDifficultyEnum.WOODEN_PICKAXE
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
        gameInstance.character.inventory.push(new stone())
    }
    update(gameInstance: McGame): void {
        console.log('updating')
    }
}