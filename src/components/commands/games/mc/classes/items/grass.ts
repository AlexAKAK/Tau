import Item from "../../interfaces/Item";
import emojis from "../../../../../utility/emojis";
import blockTypes from "../../enums/blockTypes";
import characterInterface from "../../interfaces/characterInterface";
import McGame from "../McGame";
import seed from "./seed";
import miningDifficultyEnum from "../../enums/miningDifficultyEnum";
import placeable from "../../interfaces/placeable";

export default class grass implements Item, placeable {
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
