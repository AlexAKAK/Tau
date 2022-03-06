import CommandCategory from "../classes/CommandCategory";
import bal from "../commands/economy/bal";
import baltop from "../commands/economy/baltop";
import hack from "../commands/economy/hack";
import mine from "../commands/economy/mine";
import totalcurrency from "../commands/economy/totalcurrency";
import walletcreate from "../commands/economy/walletcreate";


export default new CommandCategory('economy', [
    bal,
    //hack,
    mine,
    walletcreate,
    totalcurrency,
    baltop
],
'Economy commands')