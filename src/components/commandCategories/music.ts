import CommandCategory from "../classes/CommandCategory";
import join from "../commands/music/join";
import leave from "../commands/music/leave";
import play from "../commands/music/play";
import queue from "../commands/music/queue";
import restart from "../commands/music/restart";
import shuffle from "../commands/music/shuffle";
import skip from "../commands/music/skip";
import spotifysearch from "../commands/music/spotifysearch";
import stop from "../commands/music/stop";

export default new CommandCategory('music', [
    join,
    leave,
    play,
    queue,
    restart,
    shuffle,
    skip,
    stop
],
'Commands related to playing music in a voice channel')

