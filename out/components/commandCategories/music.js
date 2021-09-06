"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CommandCategory_1 = require("../classes/CommandCategory");
const join_1 = require("../commands/music/join");
const leave_1 = require("../commands/music/leave");
const loop_1 = require("../commands/music/loop");
const play_1 = require("../commands/music/play");
const queue_1 = require("../commands/music/queue");
const restart_1 = require("../commands/music/restart");
const shuffle_1 = require("../commands/music/shuffle");
const skip_1 = require("../commands/music/skip");
const stop_1 = require("../commands/music/stop");
exports.default = new CommandCategory_1.default('music', [
    join_1.default,
    leave_1.default,
    play_1.default,
    queue_1.default,
    restart_1.default,
    shuffle_1.default,
    skip_1.default,
    stop_1.default,
    loop_1.default
], 'Commands related to playing music in a voice channel');
