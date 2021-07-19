import Item from "../../interfaces/Item";
import emojis from "../../../../../utility/emojis";

export default class stone implements Item {
    miningDifficulty: 2
    toString(): string {
        return emojis.blackSquare
    }
    use(): void {
        
    }
}