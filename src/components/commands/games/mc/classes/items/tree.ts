import Item from "../../interfaces/Item";
import emojis from "../../../../../utility/emojis";

export default class tree implements Item {
    miningDifficulty: 1
    toString(): string {
        return emojis.tree
    }
    use(): void {
        
    }
}