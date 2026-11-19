const nspell = require('nspell')
// const spell = nspell(dictionary);

const MAX_LENGTH = 100

const MESSAGES = {
    empty: 'Please enter an answer.',
    tooLong: 'That answer is too long.',
    wrong: 'Not quite. Try again.'
}

const normalize = {
    text: (v) => String(v ?? '')
        .trim()
        .toLowerCase()
        .replace(/\s+/g, ' ')
        .replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, '')
        .replace(/^(a|an|the) /, ''),
    number: (v) => (v === '' || v == null ? null : Number(v))
}

const validate = {
    text(v, q) {
        if (q.required && !v) return 'This answer is required'
        if (q.maxLength && v.length > q.maxLength) return `Max ${q.maxLength} characters`
    },
    number(v, q) {
        if (v === null) return q.required ? 'This answer is required' : undefined
        if (!Number.isFinite(v)) return 'Enter a number'
        if (q.min != null && v < q.min) return `Must be at least ${q.min}`
        if (q.max != null && v > q.max) return `Must be at most ${q.max}`
    }
}

function validateAnswer(body) {
    const answer = body ? body.answer : undefined

    if (typeof answer !== 'string' || answer.trim() === '') {
        return { error: MESSAGES.empty }
    }
    if (answer.length > MAX_LENGTH) {
        return { error: MESSAGES.tooLong }
    }
    return { answer }
}

let spellPromise

function getSpell() {
    if (!spellPromise) {
        spellPromise = import('dictionary-en')
            .then(({ default: dictionary }) => nspell(dictionary))
            .catch((err) => {
                spellPromise = null
                throw err
            })
    }
    return spellPromise
}

const checkAnswer = (guess, puzzle, type, q = { required: true }) => {
    const value = normalize[type](guess)
    if (validate[type](value, q)) return false

    const answers = [].concat(puzzle.answer).map((a) => normalize[type](a))
    return answers.includes(value)
}

// HOW TO USE checkAnswer!!
// value 1 is the guess by the user, number or string
// value 2 is the list route to the specific puzzle
// value 3 is the type of answer expected: either text or number

const MAX_LADDER_STEPS = 20

function ladderSteps(ladder, input) {
    const start = ladder.firstWord.toLowerCase()
    const goal = ladder.goalWord.toLowerCase()

    let words = String(input ?? '').toLowerCase().split(/[\s,]+/).filter(Boolean)
    if (words[0] === start) words = words.slice(1)
    if (words[words.length - 1] === goal) words = words.slice(0, -1)
    return words
}

async function checkLadder(ladder, input) {
    const chain = [
        ladder.firstWord.toLowerCase(),
        ...ladderSteps(ladder, input),
        ladder.goalWord.toLowerCase()
    ]

    if (chain.length > MAX_LADDER_STEPS) return 'That ladder is too long. Try a shorter path.'

    const spell = await getSpell()

    for (let i = 1; i < chain.length; i++) {
        const prev = chain[i - 1]
        const word = chain[i]

        if (word.length !== prev.length) return `"${word}" needs ${prev.length} letters.`

        let changed = 0
        for (let j = 0; j < word.length; j++) {
            if (word[j] !== prev[j]) changed++
        }
        if (changed !== 1) return `"${prev}" to "${word}" must change exactly one letter.`

        if (!spell.correct(word)) return `"${word}" isn't a word we recognize.`
    }

    return null
}

module.exports = {
    MAX_LENGTH,
    MESSAGES,
    normalize,
    validate,
    validateAnswer,
    checkAnswer,
    checkLadder,
    ladderSteps,
    getSpell
}