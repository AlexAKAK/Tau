"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const emojis_1 = require("../../../../../utility/emojis");
const blockTypes_1 = require("../../enums/blockTypes");
const grass_1 = require("./grass");
const seed_1 = require("./seed");
const wood_1 = require("./wood");
const miningDifficultyEnum_1 = require("../../enums/miningDifficultyEnum");
const getRandomInt_1 = require("../../../../../utility/getRandomInt");
const greenapple_1 = require("./greenapple");
class tree {
    constructor(x, y) {
        this.miningDifficulty = miningDifficultyEnum_1.default.STANDARD;
        this.blockType = blockTypes_1.default.NOT_WALK_OVER;
        if (x != undefined && y != undefined) {
            this.x = x;
            this.y = y;
        }
    }
    setChoords(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }
    toString() {
        return emojis_1.default.tree;
    }
    use(gameInstance) {
    }
    mine(gameInstance) {
        gameInstance.grid[this.y][this.x] = new grass_1.default().setChoords(this.x, this.y);
        gameInstance.character.inventory.push(new seed_1.default());
        gameInstance.character.inventory.push(new wood_1.default());
        gameInstance.character.inventory.push(new wood_1.default());
        const i = getRandomInt_1.default(4);
        // a change of getting a green apple on mining the tree
        gameInstance.character.inventory.push(new greenapple_1.default());
    }
    update(gameInstance) {
        console.log('updating');
    }
}
exports.default = tree;
