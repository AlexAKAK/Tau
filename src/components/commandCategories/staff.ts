import CommandCategory from "../classes/CommandCategory";
import mute from "../commands/staff/mute";
import tempmute from "../commands/staff/tempmute";
import tempmutevc from "../commands/staff/tempmutevc";
import timeout from "../commands/staff/timeout";
import unmute from "../commands/staff/unmute";


export default new CommandCategory('staff', [
    //mute,
    //tempmute,
    //tempmutevc,
    //unmute
    timeout
],
'Commands for staff members')