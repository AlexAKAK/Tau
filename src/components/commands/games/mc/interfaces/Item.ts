import blockTypes from "../enums/blockTypes";
import McGame from "../classes/McGame";
import characterInterface from "../classes/characterClass";

export default abstract class Item {
    // change this later
    [x: string]: any;
    abstract toString(): string
    abstract use(gameInstance: McGame): void
    abstract miningDifficulty: number
    abstract blockType: blockTypes
    abstract mine(gameInstance: McGame): void
    abstract update(gameInstance: McGame): void
}