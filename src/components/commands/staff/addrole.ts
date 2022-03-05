import { Message, Role } from "discord.js";
import Tau from "../../..";
import CommandClass from "../../classes/CommandClass";
const selfRoles = require('./../../../../data/selfRoles');
import fs from 'fs';
import path from 'path';
import setup from "../../qt/setup";

@addrole.errorCheck([
    addrole.MISSING_ARGS_ERR_2
])
export default class addrole extends CommandClass {

    static MISSING_ARGS_ERR_2 = addrole.MISSING_ARGS_ERR_METACLASS(2)
    protected static commandCategory: string = 'staff'
    protected static commandDescription: string = 'Adds a reaction role to a category'
    protected static commandSyntax: string = 'addrole <category>|<role>'

    public async commandMain(message: Message, client: Tau): Promise<void> {
        let content = message.content.replace(client.PREFIX + 'addrole ', '')
        const category = content.substring(0, content.indexOf('|'))
        const role = content.substring(content.indexOf('|') + 1)

        console.log(category)
        console.log(role)

        if (selfRoles[category] == undefined) {
            message.channel.send('That category does not exist')
            return;
        }

        // make the role
        const newRole: Role = await message.guild.roles.create({
            name: role,
            color: '#292b2f'
        })

        // set the position of the role to directly after the last role in the category
        newRole.setPosition(message.guild.roles.cache.get(selfRoles[category][selfRoles[category].length - 1]).position + 1)
        
        selfRoles[category].push(newRole.id)
        // write the new role to the file
        fs.writeFile(path.join(__dirname, '../../../../data/selfRoles.json'), JSON.stringify(selfRoles), function() {
            message.channel.send(`Added role ${role} to category ${category}`)
            //setup(client) 
        })
        
        

    }
}