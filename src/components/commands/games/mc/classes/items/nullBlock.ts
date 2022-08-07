import Item from "../../interfaces/Item.js";
import emojis from "../../../../../utility/emojis.js";
import blockTypes from "../../enums/blockTypes.js";
import characterInterface from "../characterClass.js";
import McGame from "../McGame.js";
import miningDifficultyEnum from "../../enums/miningDifficultyEnum.js";

export default class nullBlock extends Item {
    // This block does bothing. It is only used as a placeholder in the inventory to make things easier.
    miningDifficulty: number = miningDifficultyEnum.WOODEN_PICKAXE
    blockType: blockTypes =  blockTypes.NULL_BLOCK
    x: number
    y: number
    setChoords (x: number, y: number): void {

    }
    toString(): string {
        return emojis.blackSquare
    }
    use(gameInstance: McGame): void {
        
    }
    mine(gameInstance: McGame): void {

    }
    update(gameInstance: McGame): void {

    }
}