import CommandCategory from "../classes/CommandCategory";
import bal from "../commands/currency/bal";
import hack from "../commands/currency/hack";
import mine from "../commands/currency/mine";
import walletcreate from "../commands/currency/walletcreate";
import announce from "../commands/misc/announce";
import gif from "../commands/misc/gif";
import meme from "../commands/misc/meme";
import report from "../commands/misc/report";
import yt from "../commands/misc/yt";
import ytchannel from "../commands/misc/ytchannel";

export default new CommandCategory('currency', [
    bal,
    hack,
    mine,
    walletcreate
],
'Commands for the AK Currency')