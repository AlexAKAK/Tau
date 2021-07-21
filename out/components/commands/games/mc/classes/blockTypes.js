"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var blockTypes;
(function (blockTypes) {
    blockTypes[blockTypes["WALK_OVER"] = 0] = "WALK_OVER";
    blockTypes[blockTypes["NOT_WALK_OVER"] = 1] = "NOT_WALK_OVER";
    blockTypes[blockTypes["NULL_BLOCK"] = 2] = "NULL_BLOCK";
})(blockTypes || (blockTypes = {}));
exports.default = blockTypes;
