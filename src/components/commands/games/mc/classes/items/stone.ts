import Item from "../../interfaces/Item";
import emojis from "../../../../../utility/emojis";
import blockTypes from "../../enums/blockTypes";
import characterInterface from "../../interfaces/characterInterface";
import McGame from "../McGame";
import miningDifficultyEnum from "../../enums/miningDifficultyEnum";
import placeable from "../../interfaces/placeable";

export default class stone implements Item, placeable {
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
      
    }
}