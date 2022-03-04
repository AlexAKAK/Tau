import { Message, Role } from "discord.js";
import Tau from "../../..";
import CommandClass from "../../classes/CommandClass";
const selfRoles = require('./../../../../data/selfRoles');
import fs from 'fs';
import path from 'path';
import setup from "../../qt/setup";

@deleterole.errorCheck([
    deleterole.MISSING_ARGS_ERR_2
])
export default class deleterole extends CommandClass {

    static MISSING_ARGS_ERR_2 = deleterole.MISSING_ARGS_ERR_METACLASS(2)
    protected static commandCategory: string = 'staff'
    protected static commandDescription: string = 'Remove a reaction role from a category'
    protected static commandSyntax: string = 'deleterole <category>|<role>'

    public async commandMain(message: Message, client: Tau): Promise<void> {
        let content = message.content.replace(client.PREFIX + 'deleterole ', '')
        const category = content.substring(0, content.indexOf('|'))
        const role = content.substring(content.indexOf('|') + 1)

        console.log(category)
        console.log(role)

        if (selfRoles[category] == undefined) {
            message.channel.send('That category does not exist')
            return;
        }

        if (selfRoles[category].indexOf(role) == -1) {
            message.channel.send('That role does not exist')
            return;
        }

        message.guild.roles.delete(role) // delete the role from the server
        selfRoles[category].splice(selfRoles[category].indexOf(role), 1) // remove the role from the object
        
        
        // write the new role to the file
        fs.writeFile(path.join(__dirname, '../../../../data/selfRoles.json'), JSON.stringify(selfRoles), function() {
            message.channel.send(`Removed with id ${role} from category ${category}`)
            setup(client) 
        })
        
        

    }
}