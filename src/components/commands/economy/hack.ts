import { GuildMember, Message, TextChannel } from "discord.js";
import Tau from "../../..";
import CommandClass from "../../classes/CommandClass";
import defaultColor from "../../utility/embeds/defaultColor";
import getRandomInt from "../../utility/getRandomInt";

const sendEmbed = require('./../../utility/embeds/sendEmbed')
const wallets = require('./../../../../data/wallets.json')
const ONE_HOUR: number = 3600000
const ONE_MINUTE: number = 60000

@hack.errorCheck([hack.MISSING_ARGS_ERR_2])
@hack.memberCooldown(ONE_MINUTE)
export default class hack extends CommandClass {
    static MISSING_ARGS_ERR_2 = hack.MISSING_ARGS_ERR_METACLASS(2)
    
    protected static commandCategory: string = 'currency'
    protected static commandDescription: string = 'you steal currency from another user'
    protected static commandSyntax: string = 'hack <user>'


    async commandMain(message: Message, client: Tau) {

        const args = hack.splitArgsWithoutCommandCall(message)

        const playerId = args[0].substring(3).replace('>', '')

        // check if playerId == message.author.id
        if (message.author.id == playerId) {
            sendEmbed(message.channel, {
                title: `You cannot hack yourself, ${message.author.tag}.`,
                color: 'RED',
                deleteTimeout: 5000
            })
            return;
        }


        

        if (wallets[playerId] == undefined) {
            sendEmbed(message.channel, {
                title: `That player doesn't have a wallet, ${message.author.tag}.`,
                color: defaultColor,
                deleteTimeout: 5000
            })
            return;
        }

        const member: GuildMember = hack.getMember(playerId, message.guild)

        

        if (member == undefined || member == null) hack.sendEmbed(<TextChannel> message.channel, {
            title: `No user found.`,
            color: 'RED',
            deleteTimeout: 5000
        })
        
        const amount: number = getRandomInt(2000)

        hack.stealCoin(message.author.id, playerId, amount)

        sendEmbed(message.channel, {
            title: `${message.author.tag} stole ${amount} TauCoin from ${member.user.tag}!`,
            color: 'RED',
            deleteTimeout: 10000
        })

        


    }
}