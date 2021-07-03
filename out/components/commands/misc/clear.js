"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var clear_1;
Object.defineProperty(exports, "__esModule", { value: true });
const CommandClass_1 = require("../../classes/CommandClass");
//const { quantativeRangeErrorMetaclass } = require('../classes/ErrorClass.js');
const sendEmbed = require('./../../utility/embeds/sendEmbed');
const { red, randomColor } = require('./../../utility/hexColors');
let clear = clear_1 = class clear extends CommandClass_1.default {
    // add the errors to check later
    commandMain(message, client) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = clear_1.splitArgs(message);
            const num = Number(args[1]);
            //const messages = message.client.channels.cache.get(message.channel.id);
            try {
                const channel = message.channel;
                yield channel.bulkDelete(num, false);
                sendEmbed(message.channel, {
                    title: `${num} messages cleared, ${message.author.tag}.`,
                    color: randomColor(),
                    deleteTimeout: 500
                });
                return false;
            }
            catch (_a) {
            }
        });
    } // commandMain()
};
clear.QUANTATIVE_RANGE_ERR_1_1_100 = clear_1.QUANTATIVE_RANGE_ERR_METACLASS('[Number of messages]', 1, 1, 100);
clear = clear_1 = __decorate([
    clear_1.errorCheck([
        clear_1.QUANTATIVE_RANGE_ERR_1_1_100
    ]),
    clear_1.role(clear_1.STAFF),
    clear_1.unStable
], clear);
exports.default = clear;
