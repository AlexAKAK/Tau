"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CommandCategory_1 = require("../classes/CommandCategory");
const pt_1 = require("../science/pt");
const transcribe_1 = require("../science/transcribe");
const translate_1 = require("../science/translate");
exports.default = new CommandCategory_1.default('science', [
    pt_1.default,
    transcribe_1.default,
    translate_1.default
], 'Various commands for performing tasks in science');
