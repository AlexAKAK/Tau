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
var join_1;
Object.defineProperty(exports, "__esModule", { value: true });
const CommandClass_1 = require("../../classes/CommandClass");
const { randomHi, randomBye } = require('./.././../utility/gifs');
let join = join_1 = class join extends CommandClass_1.default {
    commandMain(message, client) {
        return __awaiter(this, void 0, void 0, function* () {
            message.member.voice.channel.join();
        });
    }
};
join.commandCategory = 'music';
join.commandDescription = 'I join the voice channel you are in';
join.commandSyntax = 'join';
join = join_1 = __decorate([
    join_1.alias(['j']),
    join_1.errorCheck([
        join_1.MEMBER_NOT_IN_VC_ERR,
        join_1.CLIENT_ALREADY_IN_VC_ERR
    ])
], join);
exports.default = join;
