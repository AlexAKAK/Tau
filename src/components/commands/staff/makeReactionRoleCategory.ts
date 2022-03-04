import { Channel, Client, Guild, Message, Role, TextChannel } from "discord.js";
import Tau from "../../..";
import src from "../../..";
import CommandClass from "../../classes/CommandClass";
const selfRoles = require('./../../../../data/selfRoles')
const fs = require('fs')
import path from "path"
import setup from "../../qt/setup";

@makeReactionRoleCategory.errorCheck([
    makeReactionRoleCategory.MISSING_ARGS_ERR_2
])

@makeReactionRoleCategory.alias([
    'mrrc'
])
export default class makeReactionRoleCategory extends CommandClass {

    static MISSING_ARGS_ERR_2 = makeReactionRoleCategory.MISSING_ARGS_ERR_METACLASS(2)
    protected static commandCategory: string = 'staff'
    protected static commandDescription: string = 'Makes a new role category'
    protected static commandSyntax: string = 'mrrc <category name>'

    public async commandMain(message: Message, client: Tau): Promise<void> {
        // only for qt#2459
        let madeRoles: Role[] = []
        const channel: TextChannel = message.channel as TextChannel;
        if (message.author.id != '864397915174862860') return
        const namec = message.content.split(' ')[1]

        let active = true // represents if the category is still being created
        client.on('messageCreate', async (message: Message) => {
            if (message.author.id != '864397915174862860') return
            if (message.content == client.PREFIX + 'stop roles') {
                active = false
                // send a message to the channel that the category is finished being created
                channel.send('Reaction role category creation has been stopped.')
                await makeReactionRoleCategory.loadCategory(namec, message.guild, client, channel, madeRoles)
                setup(client) // reload the roles
            
            } // stop the creation process
            if (!active) return // if the process is not active, return from the function

            const name = message.content // the content of the message is the name of the role
            const newRole = await makeReactionRoleCategory.makeRole(name, message.guild, client, channel) // make the role

            madeRoles.push(newRole)

        })

  
    }


    protected static async makeRole(name: string, server: Guild, client: Tau, channel: TextChannel): Promise<Role> {
        const role = await server.roles.create({
            name: name,
            color: '#292b2f',
        })
        channel.send(`Created role ${name}`)


        return role

    }

    protected static async loadCategory(name: string, server: Guild, client: Tau, channel: TextChannel, roles: Role[]): Promise<void> {
        selfRoles[name] = [] // make an empty array for this category
        roles.forEach((role: Role) => {
            selfRoles[name].push(role.id)
        })

        console.log(selfRoles)

        fs.writeFileSync(path.resolve(__dirname, './../../../../data/selfRoles.json'), JSON.stringify(selfRoles))
        
        
    }
    
}