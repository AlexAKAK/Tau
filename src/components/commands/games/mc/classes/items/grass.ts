import Item from "../../interfaces/Item.js";
import emojis from "../../../../../utility/emojis.js";
import blockTypes from "../../enums/blockTypes.js";
import characterInterface from "../characterClass.js";
import McGame from "../McGame.js";
import seed from "./seed.js";
import miningDifficultyEnum from "../../enums/miningDifficultyEnum.js";
import placeable from "../../interfaces/placeable.js";

export default class grass extends Item implements placeable {
    miningDifficulty: number = miningDifficultyEnum.STANDARD
    blockType: blockTypes =  blockTypes.WALK_OVER
    x: number
    y: number

    setChoords (x: number, y: number): grass {
        this.x = x
        this.y = y
        return this
    }
    toString(): string {
        return emojis.greenSquare
    }
    use(gameInstance: McGame): void {
        
    }
    mine(gameInstance: McGame): void {

    }
    update(gameInstance: McGame): void {
        console.log('updating')
    }
}
