import CommandCategory from "../classes/CommandCategory";
import bal from "../commands/currency/bal";
import baltop from "../commands/currency/baltop";
import hack from "../commands/currency/hack";
import mine from "../commands/currency/mine";
import totalcurrency from "../commands/currency/totalcurrency";
import walletcreate from "../commands/currency/walletcreate";


export default new CommandCategory('currency', [
    bal,
    hack,
    mine,
    walletcreate,
    totalcurrency,
    baltop
],
'Commands for TauCoin')