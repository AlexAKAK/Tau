"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    skip: function (button) {
        const connection = button.message.channel.guild.me.voice.connection;
        if (connection == null || connection == undefined)
            return true;
        if (connection.dispatcher == null || connection.dispatcher == undefined)
            return true;
        return false;
    },
    queue: function (button) {
        const connection = button.message.channel.guild.me.voice.connection;
        if (connection == null || connection == undefined)
            return true;
        if (connection.dispatcher == null || connection.dispatcher == undefined)
            return true;
        return false;
    },
    restart: function (button) {
        const connection = button.message.channel.guild.me.voice.connection;
        if (connection == null || connection == undefined)
            return true;
        if (connection.dispatcher == null || connection.dispatcher == undefined)
            return true;
        return false;
    },
    stop: function (button) {
        const connection = button.message.channel.guild.me.voice.connection;
        if (connection == null || connection == undefined)
            return true;
        if (connection.dispatcher == null || connection.dispatcher == undefined)
            return true;
        return false;
    }
};
