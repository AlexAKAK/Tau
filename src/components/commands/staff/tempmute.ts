import { GuildMember, Message, TextChannel } from "discord.js";
import HydroCarbon from "../../..";
import CommandClass from "../../classes/CommandClass";
import defaultColor from "../../utility/embeds/defaultColor";



@tempmute.errorCheck([
    /*tempmute.MEMBER_ALREADY_MUTED_ERR,*/
    tempmute.MISSING_ARGS_ERR_4
])

@tempmute.role(tempmute.STAFF)

export default class tempmute extends CommandClass {
    static MISSING_ARGS_ERR_4 = tempmute.MISSING_ARGS_ERR_METACLASS(4)

    protected static commandDescription: string = 'a user is temporarily muted'
    protected static commandSyntax: string = 'tempmute <userping> <duration in ms> <unit (s/m/h)>'

    async commandMain(message: Message, client: HydroCarbon) {
        const args = tempmute.splitArgs(message)

        const playerId = args[1].substring(3).replace('>', '')
        console.log(playerId)

        const duration = Number(args[2]) // in seconds by default
        if (duration == NaN) return
        const unitSymbol = args[3]
        let unit: string
        const realDuration: number = tempmute.convertTo(duration, unitSymbol)
        if (unitSymbol == 'm') unit = 'minutes'
        else if (unitSymbol == 'h') unit = 'hours'
        else unit = 'seconds'

        
        const victim: GuildMember = tempmute.getMember(playerId, message.guild)
        if (victim == undefined) return

        if (tempmute.memberIsHigherRole(message, client)) {
            message.guild.members.cache.get(playerId).roles.add('884511677532491837')
            tempmute.sendEmbed(<TextChannel> message.channel, {
                title: `Muted ${victim.user.tag} for ${duration} ${unit}.`,
                color: defaultColor
            })
            victim.user.createDM()
            .then(dmChannel => tempmute.sendEmbed(dmChannel, {
                title: `You have been temporarily muted for ${duration} ${unit} in ${victim.guild.name}.`,
                color: defaultColor
            }))
            // sleeps for the specific number of seconds
            await tempmute.sleep(realDuration)
            message.guild.members.cache.get(playerId).roles.remove('884511677532491837')
        }
        else tempmute.sendEmbed(<TextChannel> message.channel, {
            title: `You do not have permission to tempmute ${victim.user.tag}, ${message.author.tag}.`,
            color: defaultColor,
            deleteTimeout: 5000
        })
 
    }

    /**
     * 
     * @param duration duration in seconds
     * @returns Promise<null>
     */
    static sleep(duration: number) {
        return new Promise(function(resolve, reject) {
            setTimeout(() => {
                resolve(null)
            }, duration * 1000)
        })
    }


    static memberIsHigherRole(message: Message, client: HydroCarbon): boolean {
        const args = tempmute.splitArgs(message)
        const playerId = args[1].substring(3).replace('>', '')
        console.log(playerId)
        const member = message.member
        const victimMember = message.guild.members.cache.get(playerId)

        const memberHighestRoleValue = member.roles.highest.rawPosition
        const victimHighestRoleValue = victimMember.roles.highest.rawPosition

        if (memberHighestRoleValue > victimHighestRoleValue) return true
        else return false

    }


    static convertTo(ms: number, unit: string): number {
        if (unit == 'm') return ms * 60
        else if (unit == 'h') return ms * 60 * 60
        else return ms
    }
}