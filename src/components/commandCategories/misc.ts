import CommandCategory from "../classes/CommandCategory";
import announce from "../commands/misc/announce";
import gif from "../commands/misc/gif";
import help from "../commands/misc/help";
import meme from "../commands/misc/meme";
import report from "../commands/misc/report";
import yt from "../commands/misc/yt";
import ytchannel from "../commands/misc/ytchannel";

export default new CommandCategory('misc', [
    announce,
    gif,
    meme,
    report,
    yt,
    ytchannel
],
'Random commands for fun!')