"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class textFormatting {
    // text formatting for discord
    italicize(s) {
        return `*${s}*`;
    }
    bold(s) {
        return `**${s}**`;
    }
    boldItalicized(s) {
        return `***${s}***`;
    }
    underline(s) {
        return `__${s}__`;
    }
    crossedOut(s) {
        return `~~${s}~~`;
    }
    singleLineBlock(s) {
        return `\`${s}\``;
    }
    multiLineBlock(s) {
        return `\`\`\`${s}\`\`\``;
    }
    red(s) {
        return `\`\`\`diff\n-${s}\`\`\``;
    }
    orange(s) {
        return `\`\`\`css\n[${s}]\n\`\`\``;
    }
    yellow(s) {
        return `\`\`\`fix\n${s}\`\`\``;
    }
    green(s) {
        return `\`\`\`diff\n+${s}\`\`\``;
    }
    lightGreen(s) {
        return `\`\`\`css\n${s}\`\`\``;
    }
    darkGreen(s) {
        return `\`\`\`bash\n${s}\`\`\``;
    }
    blue(s) {
        return `\`\`\`ini\n[${s}]\`\`\``;
    }
}
module.exports = new textFormatting();
