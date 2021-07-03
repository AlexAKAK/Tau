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
var mute_1;
Object.defineProperty(exports, "__esModule", { value: true });
const CommandClass_1 = require("../../classes/CommandClass");
const sendEmbed = require('./../../utility/embeds/sendEmbed');
let mute = mute_1 = class mute extends CommandClass_1.default {
    commandMain(message, client) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = mute_1.splitArgs(message);
            const playerId = args[1].substring(3).replace('>', '');
            console.log(playerId);
            const MUTED_ROLE = message.guild.roles.cache.get('848386357708849152');
            const victim = mute_1.getMember(playerId, message.guild);
            console.log(mute_1.memberIsHigherRole(message, client));
            if (mute_1.memberIsHigherRole(message, client)) {
                message.guild.members.cache.get(playerId).roles.add(MUTED_ROLE);
                mute_1.sendEmbed(message.channel, {
                    title: `Muted ${victim.user.tag}.`,
                    color: '#ff0000'
                });
                victim.user.createDM()
                    .then(dmChannel => sendEmbed(dmChannel, {
                    title: `You have been muted in ${victim.guild.name}.`,
                    color: '#ff0000'
                }));
            }
            else
                mute_1.sendEmbed(message.channel, {
                    title: `You do not have permission to mute ${victim.user.tag}, ${message.author.tag}.`,
                    color: `#ff0000`,
                    deleteTimeout: 5000
                });
        });
    }
    static memberIsHigherRole(message, client) {
        console.log('checking');
        const args = mute_1.splitArgs(message);
        const playerId = args[1].substring(3).replace('>', '');
        console.log(playerId);
        const member = message.member;
        const victimMember = message.guild.members.cache.get(playerId);
        const memberHighestRoleValue = member.roles.highest.rawPosition;
        const victimHighestRoleValue = victimMember.roles.highest.rawPosition;
        if (memberHighestRoleValue > victimHighestRoleValue)
            return true;
        else
            return false;
    }
};
mute = mute_1 = __decorate([
    mute_1.errorCheck([
        mute_1.MEMBER_ALREADY_MUTED_ERR
    ]),
    mute_1.role(mute_1.STAFF)
], mute);
exports.default = mute;
