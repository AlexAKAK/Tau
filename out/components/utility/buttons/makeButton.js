"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const disbut = require('discord-buttons');
function default_1(color, label, id) {
    let button = new disbut.MessageButton();
    button.setStyle(color);
    button.setLabel(label);
    button.setID(id);
    return button;
}
exports.default = default_1;
