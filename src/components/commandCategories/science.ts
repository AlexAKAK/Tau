import CommandCategory from "../classes/CommandCategory";
import pt from "../science/pt";
import transcribe from "../science/transcribe";
import translate from "../science/translate";

export default new CommandCategory('science', [
    pt,
    transcribe,
    translate
],
'Various commands for performing tasks in science')