import { TextChannel } from "discord.js";
import { Message } from "discord.js";
import Tau from "../../..";
import CommandClass from "../../classes/CommandClass";

export default class totalcurrency extends CommandClass {
    protected static commandCategory: string = 'currency'
    protected static commandDescription: string = 'Shows the total amount of TauCoin in circulation'
    protected static commandSyntax: string = 'totalcurrency'

    public async commandMain(message: Message, client: Tau): Promise<void> {
        const walletData = require('./../../../../data/wallets.json')
        let amount: number = 0
        
        for(const userID in walletData) {
            amount += walletData[userID]
        }

        totalcurrency.sendEmbed(<TextChannel>message.channel, {
            title: `There are currenty ${amount} TauCoins in circulation.`,
            deleteTimeout: 10000
        })
        
    }

}