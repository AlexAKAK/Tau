import Item from "../../interfaces/Item";
import emojis from "../../../../../utility/emojis";
import blockTypes from "../blockTypes";

export default class tree implements Item {
    miningDifficulty: 5
    blockType: blockTypes = blockTypes.NOT_WALK_OVER

    toString(): string {
        return emojis.tree
    }
    use(): void {
        
    }
}