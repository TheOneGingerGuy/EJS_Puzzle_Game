const { default: dictionary } = require('dictionary-en');
const nspell = require('nspell');
const spell = nspell(dictionary); // built once, when the module loads

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

const checkWord = (word) => spell.correct(word);

const checkAnswer = (guess, puzzle, type) => puzzle["answer"] == guess.validate[type]().normalize[type]() || puzzle["answer"].includes(guess.validate[type]().normalize[type]())
// guess is the input, puzzle is the puzzle object from puzzles.js and type is if it needs 'text' or a 'number'

module.exports = (checkWord, checkAnswer)