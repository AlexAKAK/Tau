import { Message, MessageEmbed, TextChannel, User } from "discord.js";
import Tau from "../../..";
import CommandClass from "../../classes/CommandClass.js";
import defaultColor from "../../utility/embeds/defaultColor.js";

export default class baltop extends CommandClass {
    protected static commandDescription: string = 'Shows the user with the highest balance'
    protected static commandSyntax: string = 'baltop'

    public async commandMain(message: Message,  client: Tau): Promise<void> {
        let topUserID: string
        let topbal: number = -1

        const walletData = require('./../../../../data/wallets.json')

        for (const userID in walletData) {
            if (walletData[userID] > topbal) {
                topbal = walletData[userID]
                topUserID = userID
            }
        }

        const topUser: User = await client.users.fetch(topUserID)

        const embed = new MessageEmbed()
        .setTitle(`The user with the highest balance is ${topUser.tag}, with ${topbal} TauCoin.`)
        .setImage(topUser.avatarURL())
        .setColor(defaultColor)
        .setTimestamp()

        message.channel.send({embeds: [embed]})
    }
}