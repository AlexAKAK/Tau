import Item from "../../interfaces/Item";
import emojis from "../../../../../utility/emojis";

export default class grass implements Item {
    miningDifficulty: 1
    toString(): string {
        return emojis.greenSquare
    }
    use(): void {
        
    }
}