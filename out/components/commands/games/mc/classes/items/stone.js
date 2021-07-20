"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const emojis_1 = require("../../../../../utility/emojis");
const blockTypes_1 = require("../blockTypes");
class stone {
    constructor() {
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
    use() {
    }
    mine(gameInstance) {
    }
}
exports.default = stone;
