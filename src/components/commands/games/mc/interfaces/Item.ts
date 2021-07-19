import blockTypes from "../classes/blockTypes";

export default interface Item {
    toString(): string
    use(): void
    miningDifficulty: number
    blockType: blockTypes
}