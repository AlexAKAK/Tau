import Item from "../../interfaces/Item";
import emojis from "../../../../../utility/emojis";
import blockTypes from "../../enums/blockTypes";
import characterInterface from "../../interfaces/characterClass";
import McGame from "../McGame";
import miningDifficultyEnum from "../../enums/miningDifficultyEnum";

export default class nullBlock implements Item {
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