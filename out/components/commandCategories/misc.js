"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CommandCategory_1 = require("../classes/CommandCategory");
const announce_1 = require("../commands/misc/announce");
const clear_1 = require("../commands/misc/clear");
const gif_1 = require("../commands/misc/gif");
const meme_1 = require("../commands/misc/meme");
const report_1 = require("../commands/misc/report");
const yt_1 = require("../commands/misc/yt");
const ytchannel_1 = require("../commands/misc/ytchannel");
exports.default = new CommandCategory_1.default('misc', [
    announce_1.default,
    gif_1.default,
    meme_1.default,
    report_1.default,
    yt_1.default,
    ytchannel_1.default,
    clear_1.default
], 'Random commands for fun!');
