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
var hack_1;
Object.defineProperty(exports, "__esModule", { value: true });
const CommandClass_1 = require("../../classes/CommandClass");
const defaultColor_1 = require("../../utility/embeds/defaultColor");
const getRandomInt_1 = require("../../utility/getRandomInt");
const sendEmbed = require('./../../utility/embeds/sendEmbed');
const wallets = require('./../../../../data/wallets.json');
let hack = hack_1 = class hack extends CommandClass_1.default {
    commandMain(message, client) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = hack_1.splitArgsWithoutCommandCall(message);
            const playerId = args[0].substring(3).replace('>', '');
            // check if playerId == message.author.id
            if (message.author.id == playerId) {
                sendEmbed(message.channel, {
                    title: `You cannot hack yourself, ${message.author.tag}.`,
                    color: 'RED',
                    deleteTimeout: 5000
                });
                return;
            }
            if (wallets[playerId] == undefined) {
                sendEmbed(message.channel, {
                    title: `That player doesn't have a wallet, ${message.author.tag}.`,
                    color: defaultColor_1.default,
                    deleteTimeout: 5000
                });
                return;
            }
            const member = hack_1.getMember(playerId, message.guild);
            if (member == undefined || member == null)
                hack_1.sendEmbed(message.channel, {
                    title: `No user found.`,
                    color: 'RED',
                    deleteTimeout: 5000
                });
            const amount = getRandomInt_1.default(2000);
            hack_1.stealCoin(message.author.id, playerId, amount);
            sendEmbed(message.channel, {
                title: `${message.author.tag} stole ${amount} BrysonCoin from ${member.user.tag}!`,
                color: 'RED',
                deleteTimeout: 10000
            });
        });
    }
};
hack.MISSING_ARGS_ERR_2 = hack_1.MISSING_ARGS_ERR_METACLASS(2);
hack.commandCategory = 'currency';
hack.commandDescription = 'you steal currency from another user';
hack.commandSyntax = 'hack <user>';
hack = hack_1 = __decorate([
    hack_1.errorCheck([hack_1.MISSING_ARGS_ERR_2])
    //1 hour
    ,
    hack_1.memberCooldown(3600000)
], hack);
exports.default = hack;
