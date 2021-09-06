import CommandCategory from "../classes/CommandCategory";
import currentgame from "../commands/games/currentgame";
import mc from "../commands/games/mc/mc";
import stopgame from "../commands/games/stopgame";

export default new CommandCategory('games', [
    mc,
    stopgame,
    currentgame
],'Games for Discord!')