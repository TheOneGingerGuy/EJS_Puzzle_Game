const nspell = require('nspell');
// const spell = nspell(dictionary);
const puzzles = require('../data/puzzles.js')

const normalize = {
    text: (v) => String(v ?? '').trim().replace(/\s+/g, ' ').toLowerCase(),
    number: (v) => (v === '' || v == null ? null : Number(v))
};

const validate = {
    text(v, q) {
        if (q.required && !v) return 'This answer is required';
        if (q.maxLength && v.length > q.maxLength) return `Max ${q.maxLength} characters`;
    },
    number(v, q) {
        if (v === null) return q.required ? 'This answer is required' : undefined;
        if (!Number.isFinite(v)) return 'Enter a number';
        if (q.min != null && v < q.min) return `Must be at least ${q.min}`;
        if (q.max != null && v > q.max) return `Must be at most ${q.max}`;
    }
}

let spellPromise;

function getSpell() {
    if (!spellPromise) {
        spellPromise = import('dictionary-en').then(({ default: dictionary }) => nspell(dictionary));
    }
    return spellPromise;
}

const checkAnswer = (guess, puzzle, type, q = { required: true }) => {
    const value = normalize[type](guess); 
    if (validate[type](value, q)) return false;

    const answers = [].concat(puzzle.answer).map((a) => normalize[type](a)); 
    return answers.includes(value);
};

console.log(checkAnswer("The Moon", puzzles.content['ezRiddles']['riddle1'], "text"))
// HOW TO USE checkAnswer!!
// value 1 is the guess by the user, number or string
// value 2 is the list route to the specific puzzle
// value 3 is the type of answer expected: either text or number

module.exports = (getSpell, checkAnswer)