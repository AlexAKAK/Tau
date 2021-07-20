"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const emojis_1 = require("../../../../../utility/emojis");
const grass_1 = require("./grass");
const tree_1 = require("./tree");
class seed {
    constructor() {
        this.miningDifficulty = -1;
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
        gameInstance.grid[block.y][block.x] = new tree_1.default(block.x, block.y);
        // remove the seed from the inventory
        gameInstance.character.inventory.splice(Number(gameInstance.mostRecentMessage.content.split(' ')[1]), 1);
    }
    mine(gameInstance) {
    }
    setChoords(x, y) {
    }
}
exports.default = seed;
