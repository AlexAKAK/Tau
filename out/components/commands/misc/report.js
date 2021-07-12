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
var report_1;
Object.defineProperty(exports, "__esModule", { value: true });
const CommandClass_1 = require("../../classes/CommandClass");
const sendEmbed = require('./../../utility/embeds/sendEmbed');
let report = report_1 = class report extends CommandClass_1.default {
    commandMain(message, client) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = report_1.splitArgsWithoutCommandCall(message);
            const playerName = args[0];
            let reason = '';
            for (let i = 1; i < args.length; i++) {
                reason = `${reason} ${args[i]}`;
            }
            sendEmbed(message.channel, {
                title: `${playerName} has been reported for ${reason}. Staff will deal with this soon.`,
                color: 'RED',
            });
        });
    }
};
report.commandCategory = 'misc';
report.commandDescription = 'report a user';
report.commandSyntax = 'report <user> <reason>';
report.MISSING_ARGS_ERR_3 = report_1.MISSING_ARGS_ERR_METACLASS(3);
report = report_1 = __decorate([
    report_1.errorCheck([report_1.MISSING_ARGS_ERR_3])
], report);
exports.default = report;
