import CommandCategory from "../classes/CommandCategory";
import pt from "../commands/science/pt";
import transcribe from "../commands/science/transcribe";
import translate from "../commands/science/translate";

export default new CommandCategory('science', [
    pt,
    transcribe,
    translate
],
'Various commands for performing tasks in science')