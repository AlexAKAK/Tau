import CommandCategory from '../classes/CommandCategory.js';
import question from './../commands/trivia/question.js';
export default new CommandCategory('trivia', [
    question
],
'Trivia commands')