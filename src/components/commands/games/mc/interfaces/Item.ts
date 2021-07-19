export default interface Item {
    toString(): string
    use(): void
    miningDifficulty: number
}