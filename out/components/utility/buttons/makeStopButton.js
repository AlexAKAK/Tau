"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_buttons_1 = require("discord-buttons");
function makeStopButton() {
    const skipButton = new discord_buttons_1.MessageButton();
    skipButton.setStyle('red');
    skipButton.setID('stop');
    skipButton.setLabel('Stop Playing');
    return skipButton;
}
exports.default = makeStopButton;
