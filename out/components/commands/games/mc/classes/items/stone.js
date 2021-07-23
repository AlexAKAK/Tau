"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const emojis_1 = require("../../../../../utility/emojis");
const blockTypes_1 = require("../../enums/blockTypes");
const miningDifficultyEnum_1 = require("../../enums/miningDifficultyEnum");
class stone {
    constructor() {
        this.miningDifficulty = miningDifficultyEnum_1.default.WOODEN_PICKAXE;
        this.blockType = blockTypes_1.default.WALK_OVER;
    }
    setChoords(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }
    toString() {
        return emojis_1.default.blackSquare;
    }
    use(gameInstance) {
    }
    mine(gameInstance) {
        gameInstance.character.inventory.push(new stone());
    }
    update(gameInstance) {
        console.log('updating');
    }
}
exports.default = stone;
