"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const emojis_1 = require("../../../../../utility/emojis");
const blockTypes_1 = require("../blockTypes");
const grass_1 = require("./grass");
class wood {
    constructor() {
        this.miningDifficulty = 2;
        this.blockType = blockTypes_1.default.WALK_OVER;
    }
    update(gameInstance) {
        console.log('updating');
    }
    toString() {
        return emojis_1.default.brownSquare;
    }
    use(gameInstance) {
        const block = gameInstance.character.getBlockInFront();
        if (block == null)
            return;
        gameInstance.grid[block.y][block.x] = new wood().setChoords(block.x, block.y);
        gameInstance.character.inventory.splice(Number(gameInstance.mostRecentMessage.content.split(' ')[1]), 1);
    }
    mine(gameInstance) {
        gameInstance.grid[this.y][this.x] = new grass_1.default().setChoords(this.x, this.y);
        gameInstance.character.inventory.push(new wood());
    }
    setChoords(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }
}
exports.default = wood;
