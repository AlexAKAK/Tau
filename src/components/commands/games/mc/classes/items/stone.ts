import Item from "../../interfaces/Item";
import emojis from "../../../../../utility/emojis";
import blockTypes from "../blockTypes";

export default class stone implements Item {
    miningDifficulty: 2
    blockType: blockTypes =  blockTypes.WALK_OVER

    toString(): string {
        return emojis.blackSquare
    }
    use(): void {
        
    }
}