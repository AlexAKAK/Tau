"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const emojis_1 = require("../../../../../utility/emojis");
const blockTypes_1 = require("../blockTypes");
class stone {
    constructor() {
        this.blockType = blockTypes_1.default.NOT_WALK_OVER;
    }
    toString() {
        return emojis_1.default.blackSquare;
    }
    use() {
    }
}
exports.default = stone;
