import blockTypes from "../enums/blockTypes";
import McGame from "../classes/McGame";
import characterInterface from "./characterInterface";

export default interface Item {
    // change this later
    [x: string]: any;
    toString(): string
    use(gameInstance: McGame): void
    miningDifficulty: number
    blockType: blockTypes
    mine(gameInstance: McGame): void
    update(gameInstance: McGame): void
}