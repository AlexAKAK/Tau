import CommandCategory from "../classes/CommandCategory.js";
import ball from "../commands/misc/ball.js";
import announce from "../commands/misc/announce.js";
import clear from "../commands/misc/clear.js";
import color from "../commands/misc/color.js";
import dog from "../commands/misc/dog.js";
import gif from "../commands/misc/gif.js";
import help from "../commands/misc/help.js";
import meme from "../commands/misc/meme.js";
import report from "../commands/misc/report.js";
import yt from "../commands/misc/yt.js";
import ytchannel from "../commands/misc/ytchannel.js";
import quote from "../commands/misc/quote.js";

export default new CommandCategory('misc', [
    //color,
    gif,
    meme,
    report,
    yt,
    ytchannel,
    //clear,
    dog,
    ball,
    quote
],
'Random commands for fun!') 