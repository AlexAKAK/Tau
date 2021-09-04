"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CommandCategory_1 = require("../classes/CommandCategory");
const bal_1 = require("../commands/currency/bal");
const hack_1 = require("../commands/currency/hack");
const mine_1 = require("../commands/currency/mine");
const walletcreate_1 = require("../commands/currency/walletcreate");
exports.default = new CommandCategory_1.default('currency', [
    bal_1.default,
    hack_1.default,
    mine_1.default,
    walletcreate_1.default
], 'Commands for the AK Currency');
