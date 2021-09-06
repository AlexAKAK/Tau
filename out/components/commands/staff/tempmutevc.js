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
var tempmutevc_1;
Object.defineProperty(exports, "__esModule", { value: true });
const CommandClass_1 = require("../../classes/CommandClass");
const defaultColor_1 = require("../../utility/embeds/defaultColor");
let tempmutevc = tempmutevc_1 = class tempmutevc extends CommandClass_1.default {
    commandMain(message, client) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('tempmutevc');
            const args = tempmutevc_1.splitArgs(message);
            const playerId = args[1].substring(3).replace('>', '');
            console.log(playerId);
            const duration = Number(args[2]) * 1000;
            const victim = tempmutevc_1.getMember(playerId, message.guild);
            if (victim == message.guild.me)
                return;
            victim.voice.setMute(true);
            setTimeout(() => {
                victim.voice.setMute(false);
            }, duration);
            tempmutevc_1.sendEmbed(message.channel, {
                title: `Temporarily vc muted ${victim.user.tag} for ${duration / 1000} seconds.`,
                color: defaultColor_1.default,
                deleteTimeout: 5000,
            });
            victim.user.createDM()
                .then(dmChannel => tempmutevc_1.sendEmbed(dmChannel, {
                title: `You have been vc muted for ${duration / 1000} seconds in ${victim.guild.name}.`,
                color: defaultColor_1.default
            }));
        });
    }
};
tempmutevc.commandDescription = 'A user is temporarily muted from vc';
tempmutevc.commandSyntax = 'tempmutevc <userping> <duration in ms>';
tempmutevc.MISSING_ARGS_ERR_3 = tempmutevc_1.MISSING_ARGS_ERR_METACLASS(3);
tempmutevc = tempmutevc_1 = __decorate([
    tempmutevc_1.errorCheck([
        tempmutevc_1.MISSING_ARGS_ERR_3
    ])
], tempmutevc);
exports.default = tempmutevc;
