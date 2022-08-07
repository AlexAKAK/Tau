import CommandCategory from "../classes/CommandCategory";
import ball from "../commands/misc/8ball";
import announce from "../commands/misc/announce";
import clear from "../commands/misc/clear";
import color from "../commands/misc/color";
import dog from "../commands/misc/dog";
import gif from "../commands/misc/gif";
import help from "../commands/misc/help";
import meme from "../commands/misc/meme";
import report from "../commands/misc/report";
import yt from "../commands/misc/yt";
import ytchannel from "../commands/misc/ytchannel";

export default new CommandCategory('misc', [
    //color,
    gif,
    meme,
    report,
    yt,
    ytchannel,
    //clear,
    dog,
    ball
],
'Random commands for fun!') 