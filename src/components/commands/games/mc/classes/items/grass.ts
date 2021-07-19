import Item from "../../interfaces/Item";
import emojis from "../../../../../utility/emojis";
import blockTypes from "../blockTypes";

export default class grass implements Item {
    miningDifficulty: 1
    blockType: blockTypes =  blockTypes.WALK_OVER
    toString(): string {
        return emojis.greenSquare
    }
    use(): void {
        
    }
}