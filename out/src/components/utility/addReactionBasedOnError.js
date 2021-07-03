"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { FINGER_CIRCLE, X } = require("./reactions");
function addReactionBasedOnError(message, errBool) {
    // message: Discord.Message
    // errBool: bool
    console.log(errBool);
    if (errBool === false)
        message.react(FINGER_CIRCLE);
    else if (errBool === true)
        message.react(X);
}
module.exports = addReactionBasedOnError;
