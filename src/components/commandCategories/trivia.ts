import CommandCategory from '../classes/CommandCategory';
import question from './../commands/trivia/question';
export default new CommandCategory('trivia', [
    question
],
'Trivia commands')