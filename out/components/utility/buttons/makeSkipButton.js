"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_buttons_1 = require("discord-buttons");
function makeSkipButton() {
    const skipButton = new discord_buttons_1.MessageButton();
    skipButton.setStyle('blurple');
    skipButton.setID('skip');
    skipButton.setLabel('Skip Song');
    return skipButton;
}
exports.default = makeSkipButton;
