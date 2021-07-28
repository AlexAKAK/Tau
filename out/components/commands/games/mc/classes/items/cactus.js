"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const emojis_1 = require("../../../../../utility/emojis");
const blockTypes_1 = require("../../enums/blockTypes");
const miningDifficultyEnum_1 = require("../../enums/miningDifficultyEnum");
const grass_1 = require("./grass");
class cactus {
    constructor() {
        this.miningDifficulty = miningDifficultyEnum_1.default.STONE_SWORD;
        this.blockType = blockTypes_1.default.NOT_WALK_OVER;
    }
    toString() {
        return emojis_1.default.cactus;
    }
    use(gameInstance) {
        const block = gameInstance.character.getBlockInFront();
        if (block == null)
            return;
        gameInstance.grid[block.y][block.x] = new cactus().setChoords(block.x, block.y);
        gameInstance.character.inventory.splice(Number(gameInstance.mostRecentMessage.content.split(' ')[1]), 1);
    }
    mine(gameInstance) {
        gameInstance.character.inventory.push(new cactus());
        gameInstance.grid[this.y][this.x] = new grass_1.default();
    }
    update(gameInstance) {
        // check if the character is thouching the cactus
        let isTouching = false;
        if (gameInstance.character.getNorthBlock() == this)
            isTouching = true;
        if (gameInstance.character.getEastBlock() == this)
            isTouching = true;
        if (gameInstance.character.getWestBlock() == this)
            isTouching = true;
        if (gameInstance.character.getSouthBlock() == this)
            isTouching = true;
        if (isTouching)
            gameInstance.character.health--;
    }
    setChoords(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }
}
exports.default = cactus;
