"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ErrorClass {
    getCommandName(message) {
        const unCutCommand = message.content.split(' ')[0];
        const commandName = unCutCommand.substring(1, unCutCommand.length);
        return commandName;
    }
    splitArgs(message) {
        return message.content.split(' ');
    }
    sendErrMessage(channel, errMessage) {
        sendEmbed(channel, {
            title: errMessage,
            color: '#FFA500',
            deleteTimeout: 5000
        });
    }
}
exports.default = ErrorClass;
