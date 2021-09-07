"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const CommandClass_1 = require("../../classes/CommandClass");
const defaultColor_1 = require("../../utility/embeds/defaultColor");
const MUTED_ROLE = '884635864557293611';
class tempmutevc extends CommandClass_1.default {
    commandMain(message, client) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('tempmutevc');
            const args = tempmutevc.splitArgs(message);
            const playerId = args[1].substring(3).replace('>', '');
            console.log(playerId);
            const duration = Number(args[2]);
            if (duration == NaN)
                return;
            const unitSymbol = args[3];
            let unit;
            const realDuration = tempmutevc.convertTo(duration, unitSymbol);
            if (unitSymbol == 'm')
                unit = 'minutes';
            else if (unitSymbol == 'h')
                unit = 'hours';
            else
                unit = 'seconds';
            const victim = tempmutevc.getMember(playerId, message.guild);
            if (victim == undefined)
                return;
            if (victim == message.guild.me)
                return;
            victim.roles.add(MUTED_ROLE);
            setTimeout(() => {
                victim.roles.remove(MUTED_ROLE);
            }, realDuration * 1000);
            tempmutevc.sendEmbed(message.channel, {
                title: `Temporarily vc muted ${victim.user.tag} for ${duration} ${unit}`,
                color: defaultColor_1.default,
                deleteTimeout: 5000,
            });
            victim.user.createDM()
                .then(dmChannel => tempmutevc.sendEmbed(dmChannel, {
                title: `You have been vc muted for ${duration} ${unit} in ${victim.guild.name}.`,
                color: defaultColor_1.default
            }));
        });
    }
    static convertTo(ms, unit) {
        if (unit == 'm')
            return ms * 60;
        else if (unit == 'h')
            return ms * 60 * 60;
        else
            return ms;
    }
}
exports.default = tempmutevc;
tempmutevc.commandDescription = 'A user is temporarily muted from vc';
tempmutevc.commandSyntax = 'tempmutevc <userping> <duration> <unit (s/m/h)>';
tempmutevc.MISSING_ARGS_ERR_4 = tempmutevc.MISSING_ARGS_ERR_METACLASS(4);
