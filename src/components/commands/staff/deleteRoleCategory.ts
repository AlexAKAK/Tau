import { Message } from "discord.js";
import path from "path";
import src from "../../..";
import CommandClass from "../../classes/CommandClass";
import setup from "../../qt/setup";
const selfRoles = require("../../../../data/selfRoles");
const fs = require("fs");

@deleteRoleCategory.errorCheck([
    deleteRoleCategory.MISSING_ARGS_ERR_2
])

@deleteRoleCategory.alias(['drrc'])
export default class deleteRoleCategory extends CommandClass {
    static MISSING_ARGS_ERR_2 = deleteRoleCategory.MISSING_ARGS_ERR_METACLASS(2)

    protected static commandCategory: string = 'staff'
    protected static commandDescription: string = 'deletes a role category'
    protected static commandSyntax: string = 'drrc <category name>'

    public async commandMain(message: Message<boolean>, client: src): Promise<void> {
        if (message.author.id != '864397915174862860') return
        const server = message.guild
        const categoryName: string = message.content.substring(message.content.indexOf(' ') + 1)
        console.log(categoryName)

        if (selfRoles[categoryName] == undefined) {
            message.channel.send("That category does not exist")
            return
        }

        // delete each role in the category
        selfRoles[categoryName].forEach(roleId => {
            server.roles.cache.get(roleId).delete()
        });

        // delete the role ids from the json file

        selfRoles[categoryName] = undefined

        // save the json file
        fs.writeFileSync(path.join(__dirname, '../../../../data/selfRoles.json'), JSON.stringify(selfRoles))
    
        setup(client) // reload the roles
    
    }


    
}