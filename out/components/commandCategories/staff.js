"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CommandCategory_1 = require("../classes/CommandCategory");
const mute_1 = require("../commands/staff/mute");
const tempmute_1 = require("../commands/staff/tempmute");
const tempmutevc_1 = require("../commands/staff/tempmutevc");
const unmute_1 = require("../commands/staff/unmute");
exports.default = new CommandCategory_1.default('staff', [
    mute_1.default,
    tempmute_1.default,
    tempmutevc_1.default,
    unmute_1.default
], 'Commands for staff members');
