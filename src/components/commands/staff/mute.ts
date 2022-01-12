import { GuildMember, Message, TextChannel } from "discord.js";
import HydroCarbon from "../../..";
import CommandClass from "../../classes/CommandClass";
import defaultColor from "../../utility/embeds/defaultColor";

const sendEmbed = require('./../../utility/embeds/sendEmbed')


@mute.errorCheck([
    mute.MEMBER_ALREADY_MUTED_ERR
])

@mute.role(mute.STAFF)

export default class mute extends CommandClass {
    protected static commandDescription: string = 'A player is muted'
    protected static commandSyntax: string = 'mute <userping>'
    async commandMain(message: Message, client: HydroCarbon) {
        const args = mute.splitArgs(message)

        const playerId = args[1].substring(3).replace('>', '')
        console.log(playerId)

        const victim: GuildMember = mute.getMember(playerId, message.guild)


        console.log(mute.memberIsHigherRole(message, client))

        if (mute.memberIsHigherRole(message, client)) {
            message.guild.members.cache.get(playerId).roles.add('884511677532491837')
            mute.sendEmbed(<TextChannel> message.channel, {
                title: `Muted ${victim.user.tag}.`,
                color: defaultColor
            })

            victim.user.createDM()
            .then(dmChannel => sendEmbed(dmChannel, {
                title: `You have been muted in ${victim.guild.name}.`,
                color: defaultColor
            }))
        }
        else mute.sendEmbed(<TextChannel> message.channel, {
            title: `You do not have permission to mute ${victim.user.tag}, ${message.author.tag}.`,
            color: defaultColor,
            deleteTimeout: 5000
        })

        
    }

    static memberIsHigherRole(message: Message, client: HydroCarbon): boolean {
        console.log('checking')
        const args = mute.splitArgs(message)
        const playerId = args[1].substring(3).replace('>', '')
        console.log(playerId)
        const member = message.member
        const victimMember = message.guild.members.cache.get(playerId)

        const memberHighestRoleValue = member.roles.highest.rawPosition
        const victimHighestRoleValue = victimMember.roles.highest.rawPosition

        if (memberHighestRoleValue > victimHighestRoleValue) return true
        else return false

    }
}
