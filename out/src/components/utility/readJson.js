"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
function readJson(dir) {
    return new Promise((resolve, reject) => {
        fs.readFile(dir, 'utf-8', (err, jsonString) => {
            console.log(jsonString);
            const data = JSON.parse(jsonString);
            resolve(data);
        });
    });
}
exports.default = readJson;
