"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CommandCategory_1 = require("../classes/CommandCategory");
const mc_1 = require("../commands/games/mc/mc");
exports.default = new CommandCategory_1.default('games', [
    mc_1.default
], 'Games for Discord!');
