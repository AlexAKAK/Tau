import CommandCategory from "../classes/CommandCategory.js";
import pt from "../commands/science/pt.js";
import transcribe from "../commands/science/transcribe.js";
import translate from "../commands/science/translate.js";

export default new CommandCategory('science', [
    pt,
    transcribe,
    translate
],
'Various commands for performing tasks in science')