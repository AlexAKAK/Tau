import CommandCategory from "../classes/CommandCategory.js";
import join from "../commands/music/join.js";
import leave from "../commands/music/leave.js";
import loop from "../commands/music/loop.js";
import play from "../commands/music/play.js";
import playing from "../commands/music/playing.js";
import queue from "../commands/music/queue.js";
import restart from "../commands/music/restart.js";
import shuffle from "../commands/music/shuffle.js";
import skip from "../commands/music/skip.js";
import spotifysearch from "../commands/music/spotifysearch.js";
import stop from "../commands/music/stop.js";

export default new CommandCategory('music', [
    join,
    leave,
    
    play,
    queue,
    //restart,
    //shuffle,
    skip,
    //stop,
    //loop,
    //playing
    
],
'Commands related to playing music in a voice channel')

