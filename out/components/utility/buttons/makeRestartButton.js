"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_buttons_1 = require("discord-buttons");
function makeRestartButton() {
    const skipButton = new discord_buttons_1.MessageButton();
    skipButton.setStyle('blurple');
    skipButton.setID('restart');
    skipButton.setLabel('Restart Song');
    return skipButton;
}
exports.default = makeRestartButton;
