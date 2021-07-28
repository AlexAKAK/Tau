"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const emojis_1 = require("../../../../../utility/emojis");
const blockTypes_1 = require("../../enums/blockTypes");
const miningDifficultyEnum_1 = require("../../enums/miningDifficultyEnum");
const nullBlock_1 = require("./nullBlock");
const stone_1 = require("./stone");
const wood_1 = require("./wood");
class stoneSword {
    constructor() {
        this.miningDifficulty = null;
        this.blockType = null;
    }
    static craft(gameInstance) {
        // find the number of wood blocks in the inventory
        let countWood = 0;
        let countStone = 0;
        let woodIndex = [];
        let stoneIndex = [];
        for (let i = 0; i < gameInstance.character.inventory.length; i++) {
            if (gameInstance.character.inventory[i].toString() == wood_1.default.prototype.toString()) {
                countWood++;
                woodIndex.push(i);
            }
        }
        for (let i = 0; i < gameInstance.character.inventory.length; i++) {
            if (gameInstance.character.inventory[i].toString() == stone_1.default.prototype.toString()) {
                countStone++;
                woodIndex.push(i);
            }
        }
        if (countWood < 4)
            return;
        if (countStone < 4)
            return;
        gameInstance.character.inventory.push(new stoneSword());
        // remove 4 wood
        for (let i = 0; i < 4; i++) {
            gameInstance.character.inventory[woodIndex[i]] = new nullBlock_1.default();
        }
        for (let i = 0; i < 4; i++) {
            gameInstance.character.inventory[stoneIndex[i]] = new nullBlock_1.default();
        }
        for (let i = 0; i < gameInstance.character.inventory.length; i++) {
            if (gameInstance.character.inventory[i].blockType == blockTypes_1.default.NULL_BLOCK) {
                gameInstance.character.inventory.splice(i, 1);
                i = 0;
            }
        }
        for (let i = 0; i < gameInstance.character.inventory.length; i++) {
            if (gameInstance.character.inventory[i].blockType == blockTypes_1.default.NULL_BLOCK) {
                gameInstance.character.inventory.splice(i, 1);
                i = 0;
            }
        }
    }
    toString() {
        return emojis_1.default.stone_sword;
    }
    use(gameInstance) {
        const block = gameInstance.character.getBlockInFront();
        if (block.blockType != blockTypes_1.default.MOB) {
            // this will mean that the block is getting mined.
            // Check if the block is able to be mined by a stone sword
            if (block.miningDifficulty == miningDifficultyEnum_1.default.STONE_SWORD || block.miningDifficulty == miningDifficultyEnum_1.default.STANDARD) {
                block.mine(gameInstance);
            }
        }
        else {
        }
    }
    mine(gameInstance) {
    }
    update(gameInstance) {
    }
}
exports.default = stoneSword;
