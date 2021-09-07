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
var tempmute_1;
Object.defineProperty(exports, "__esModule", { value: true });
const CommandClass_1 = require("../../classes/CommandClass");
const defaultColor_1 = require("../../utility/embeds/defaultColor");
let tempmute = tempmute_1 = class tempmute extends CommandClass_1.default {
    commandMain(message, client) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = tempmute_1.splitArgs(message);
            const playerId = args[1].substring(3).replace('>', '');
            console.log(playerId);
            const duration = Number(args[2]); // in seconds by default
            const unitSymbol = args[3];
            let unit;
            const realDuration = tempmute_1.convertTo(duration, unitSymbol);
            if (unitSymbol == 'm')
                unit = 'minutes';
            else if (unitSymbol == 'h')
                unit = 'hours';
            else
                unit = 'seconds';
            const victim = tempmute_1.getMember(playerId, message.guild);
            if (tempmute_1.memberIsHigherRole(message, client)) {
                message.guild.members.cache.get(playerId).roles.add('884511677532491837');
                tempmute_1.sendEmbed(message.channel, {
                    title: `Muted ${victim.user.tag} for ${duration} ${unit}.`,
                    color: defaultColor_1.default
                });
                victim.user.createDM()
                    .then(dmChannel => tempmute_1.sendEmbed(dmChannel, {
                    title: `You have been temporarily muted for ${duration} ${unit} in ${victim.guild.name}.`,
                    color: defaultColor_1.default
                }));
                // sleeps for the specific number of seconds
                yield tempmute_1.sleep(realDuration);
                message.guild.members.cache.get(playerId).roles.remove('884511677532491837');
            }
            else
                tempmute_1.sendEmbed(message.channel, {
                    title: `You do not have permission to tempmute ${victim.user.tag}, ${message.author.tag}.`,
                    color: defaultColor_1.default,
                    deleteTimeout: 5000
                });
        });
    }
    /**
     *
     * @param duration duration in seconds
     * @returns Promise<null>
     */
    static sleep(duration) {
        return new Promise(function (resolve, reject) {
            setTimeout(() => {
                resolve(null);
            }, duration * 1000);
        });
    }
    static memberIsHigherRole(message, client) {
        const args = tempmute_1.splitArgs(message);
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
    static convertTo(ms, unit) {
        if (unit == 'm')
            return ms * 60;
        else if (unit == 'h')
            return ms * 60 * 60;
        else
            return ms;
    }
};
tempmute.MISSING_ARGS_ERR_4 = tempmute_1.MISSING_ARGS_ERR_METACLASS(4);
tempmute.commandDescription = 'a user is temporarily muted';
tempmute.commandSyntax = 'tempmute <userping> <duration in ms>';
tempmute = tempmute_1 = __decorate([
    tempmute_1.errorCheck([
        /*tempmute.MEMBER_ALREADY_MUTED_ERR,*/
        tempmute_1.MISSING_ARGS_ERR_4
    ]),
    tempmute_1.role(tempmute_1.STAFF)
], tempmute);
exports.default = tempmute;
