import CommandCategory from "../classes/CommandCategory.js";
import mute from "../commands/staff/mute";
import colorreaction from "../commands/staff/colorreaction.js";
import rules from "../commands/staff/rules.js";
import tempmute from "../commands/staff/tempmute.js";
import tempmutevc from "../commands/staff/tempmutevc.js";
import timeout from "../commands/staff/timeout.js";
import unmute from "../commands/staff/unmute.js";
import makeReactionRoleCategory from "../commands/staff/makeReactionRoleCategory.js";
import deleteRoleCategory from "../commands/staff/deleteRoleCategory.js";
import addrole from "../commands/staff/addRole.js";
import deleterole from "../commands/staff/deleterole.js";
import initialize from "../commands/staff/initialize.js";


export default new CommandCategory('staff', [
    //mute,
    //tempmute,
    //tempmutevc,
    //unmute
    timeout,
    rules,
    colorreaction,
    makeReactionRoleCategory,
    deleteRoleCategory,
    addrole,
    deleterole,
    initialize
],
'Commands for staff members')