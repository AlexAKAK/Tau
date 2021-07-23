"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const emojis_1 = require("../../../../../utility/emojis");
const miningDifficultyEnum_1 = require("../../enums/miningDifficultyEnum");
const grass_1 = require("./grass");
const tree_1 = require("./tree");
class seed {
    constructor() {
        this.growthProgress = 1;
        this.miningDifficulty = miningDifficultyEnum_1.default.STANDARD;
        this.blockType = -1;
    }
    toString() {
        return emojis_1.default.seed;
    }
    use(gameInstance) {
        const block = gameInstance.character.getBlockInFront();
        if (block.toString() != grass_1.default.prototype.toString())
            return;
        if (block == null)
            return;
        gameInstance.grid[block.y][block.x] = this.setChoords(block.x, block.y);
        // remove the seed from the inventory
        gameInstance.character.inventory.splice(Number(gameInstance.mostRecentMessage.content.split(' ')[1]), 1);
    }
    mine(gameInstance) {
        gameInstance.grid[this.y][this.x] = new grass_1.default().setChoords(this.x, this.y);
    }
    setChoords(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }
    update(gameInstance) {
        console.log('updating');
        this.growthProgress++;
        if (this.growthProgress == 9) {
            gameInstance.grid[this.y][this.x] = new tree_1.default(this.x, this.y);
        }
    }
}
exports.default = seed;
