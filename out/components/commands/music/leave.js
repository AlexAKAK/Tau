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
var leave_1;
Object.defineProperty(exports, "__esModule", { value: true });
const { blue } = require('./.././../utility/hexColors');
const CommandClass_1 = require("../../classes/CommandClass");
const { randomHi, randomBye } = require('./.././../utility/gifs');
let leave = leave_1 = class leave extends CommandClass_1.default {
    commandMain(message, client) {
        return __awaiter(this, void 0, void 0, function* () {
            message.guild.me.voice.channel.leave();
            //message.react('👋')
            /*
            const sentMessage = await message.channel.send(randomBye())
    
            setTimeout(() => {
                sentMessage.delete()
            }, 5000)
            */
        });
    }
};
leave.commandCategory = 'music';
leave.commandDescription = 'I leave the voice channel I\'m in';
leave.commandSyntax = 'leave';
leave = leave_1 = __decorate([
    leave_1.alias(['l']),
    leave_1.errorCheck([
        leave_1.CLIENT_NOT_IN_VC_ERR
    ])
], leave);
exports.default = leave;
