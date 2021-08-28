"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_buttons_1 = require("discord-buttons");
function makeQueueButton() {
    const skipButton = new discord_buttons_1.MessageButton();
    skipButton.setStyle('green');
    skipButton.setID('queue');
    skipButton.setLabel('Refresh Queue');
    return skipButton;
}
exports.default = makeQueueButton;
