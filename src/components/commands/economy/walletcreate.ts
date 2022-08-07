import { Message } from "discord.js";
import Tau from "../../..";
import CommandClass from "../../classes/CommandClass.js";
import defaultColor from "../../utility/embeds/defaultColor.js";
import readJson from "../../utility/readJson.js";

const sendEmbed = require('./../../utility/embeds/sendEmbed')

const fs = require('fs')

export default class walletcreate extends CommandClass {
    protected static commandCategory: string = 'currency'
    protected static commandDescription: string = 'You create a wallet for currency'
    protected static commandSyntax: string = 'walletcreate'



    async commandMain(message: Message, client: Tau) {

        //const walletsPath = require('path').resolve(__dirname, './../../../../data/wallets.json')

        const wallets: object = require('./../../../../data/wallets.json')

        console.log(wallets)

        if (wallets[message.author.id] != undefined) sendEmbed(message.channel, {
            title: `You already have a wallet, ${message.author.tag}.`,
            color: defaultColor,
            deleteTimeout: 5000
        })
        else {
            wallets[message.author.id] == 0
            Object.assign(wallets, {[message.author.id]: 0});
            
            const jsonString: string = JSON.stringify(wallets)
            
            //write the data
            console.log(jsonString)
            const logPath = require('path').resolve(__dirname, './../../../../data/wallets.json')
            console.log(logPath)
            fs.writeFile(logPath, jsonString, err => {
                if (err) {
                  console.error(err)
                  return
                }
                //file written successfully
            })

            sendEmbed(message.channel, {
                title: `Wallet created, ${message.author.tag}!`,
                color: defaultColor,
                deleteTimeout: 5000
            })
        }

        
    }
}