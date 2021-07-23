"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const emojis_1 = require("../../../../../utility/emojis");
const blockTypes_1 = require("../../enums/blockTypes");
const miningDifficultyEnum_1 = require("../../enums/miningDifficultyEnum");
class grass {
    constructor() {
        this.miningDifficulty = miningDifficultyEnum_1.default.STANDARD;
        this.blockType = blockTypes_1.default.WALK_OVER;
    }
    setChoords(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }
    toString() {
        return emojis_1.default.greenSquare;
    }
    use(gameInstance) {
    }
    mine(gameInstance) {
    }
    update(gameInstance) {
        console.log('updating');
    }
}
exports.default = grass;
