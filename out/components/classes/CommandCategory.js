"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CommandCategory {
    constructor(name, commands, description) {
        this.commands = commands;
        this.name = name;
        this.description = description;
    }
    addCommand(command) {
        this.commands.push(command);
    }
}
exports.default = CommandCategory;
