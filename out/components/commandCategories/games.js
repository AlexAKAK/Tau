"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CommandCategory_1 = require("../classes/CommandCategory");
const currentgame_1 = require("../commands/games/currentgame");
const mc_1 = require("../commands/games/mc/mc");
const stopgame_1 = require("../commands/games/stopgame");
exports.default = new CommandCategory_1.default('games', [
    mc_1.default,
    stopgame_1.default,
    currentgame_1.default
], 'Games for Discord!');
