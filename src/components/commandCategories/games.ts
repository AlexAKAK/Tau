import CommandCategory from "../classes/CommandCategory.js";
import currentgame from "../commands/games/currentgame.js";
import mc from "../commands/games/mc/mc.js";
import stopgame from "../commands/games/stopgame.js";

export default new CommandCategory('games', [
    mc,
    stopgame,
    currentgame
],'Games for Discord!')