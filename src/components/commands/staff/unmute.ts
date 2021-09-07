import { GuildMember, Message, TextChannel } from "discord.js";
import HydroCarbon from "../../..";
import CommandClass from "../../classes/CommandClass";
import defaultColor from "../../utility/embeds/defaultColor";



@unmute.errorCheck([
    unmute.MEMBER_ALREADY_UNMUTED_ERR
])

@unmute.role(unmute.STAFF)

export default class unmute extends CommandClass {
    protected static commandDescription: string = 'a user is unmuted'
    protected static commandSyntax: string = 'unmute <userping>'
    async commandMain(message: Message, client: HydroCarbon) {
        const args = unmute.splitArgs(message)

        const playerId = args[1].substring(3).replace('>', '')
        console.log(playerId)

        const MUTED_ROLE = message.guild.roles.cache.get('884511677532491837')
        const victim: GuildMember = unmute.getMember(playerId, message.guild)


        if (unmute.memberIsHigherRole(message, client)) {
            message.guild.members.cache.get(playerId).roles.remove(MUTED_ROLE)
            unmute.sendEmbed(<TextChannel> message.channel, {
                title: `Unmuted ${victim.user.tag}.`,
                color: defaultColor
            })

            victim.user.createDM()
            .then(dmChannel => unmute.sendEmbed(dmChannel, {
                title: `You have been unmuted in ${victim.guild.name}.`,
                color: defaultColor
            }))
        }
        else unmute.sendEmbed(<TextChannel> message.channel, {
            title: `You do not have permission to unmute ${victim.user.tag}, ${message.author.tag}.`,
            color: defaultColor,
            deleteTimeout: 5000
        })

        


    }

    static memberIsHigherRole(message: Message, client: HydroCarbon): boolean {
        const args = unmute.splitArgs(message)
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