"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
function getDirectories(path) {
    return fs.readdirSync(path).filter(function (file) {
        return fs.statSync(path + '/' + file).isDirectory();
    });
}
exports.default = getDirectories;
