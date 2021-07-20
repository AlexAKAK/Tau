import blockTypes from "../classes/blockTypes";
import McGame from "../classes/McGame";
import characterInterface from "./characterInterface";

export default interface Item {
    toString(): string
    use(gameInstance: McGame): void
    miningDifficulty: number
    blockType: blockTypes
    mine(gameInstance: McGame): void
    setChoords(x: number, y: number)
      
    
}