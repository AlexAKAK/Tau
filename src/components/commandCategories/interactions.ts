import CommandCategory from "../classes/CommandCategory.js";
import cuddle from "../commands/interactions/cuddle/cuddle.js";
import hug from "../commands/interactions/hug/hug.js";
import kiss from "../commands/interactions/kiss/kiss.js";
import slap from "../commands/interactions/slap/slap.js";

export default new CommandCategory('interactions', [
    hug,
    cuddle,
    slap,
    kiss
],
'Interactions') 