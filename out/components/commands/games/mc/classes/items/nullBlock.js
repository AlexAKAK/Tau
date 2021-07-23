"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const emojis_1 = require("../../../../../utility/emojis");
const blockTypes_1 = require("../../enums/blockTypes");
const miningDifficultyEnum_1 = require("../../enums/miningDifficultyEnum");
class nullBlock {
    constructor() {
        // This block does bothing. It is only used as a placeholder in the inventory to make things easier.
        this.miningDifficulty = miningDifficultyEnum_1.default.WOODEN_PICKAXE;
        this.blockType = blockTypes_1.default.NULL_BLOCK;
    }
    setChoords(x, y) {
    }
    toString() {
        return emojis_1.default.blackSquare;
    }
    use(gameInstance) {
    }
    mine(gameInstance) {
    }
    update(gameInstance) {
    }
}
exports.default = nullBlock;
