const express = require('express')
const router = express.Router()

const { content, puzzles, victorySlug } = require('../data/puzzles')
const { MESSAGES, validateAnswer, checkAnswer, checkLadder, ladderSteps } = require('../lib/answers')
const gate = require('../middleware/gate')

const LADDER_RUNGS = 3

const checkText = (variant, answer) => (checkAnswer(answer, variant, 'text') ? null : MESSAGES.wrong)

const types = {
    wordLadder: {
        variants: Object.values(content.wordLadder),
        check: async (v, answer) => {
            const problem = await checkLadder(v, answer)
            return problem ? `${MESSAGES.wrong} ${problem}` : null
        },
        ladder: (v, answer) => {
            const steps = ladderSteps(v, answer)
            return {
                first: v.firstWord,
                goal: v.goalWord,
                rows: Array.from({ length: LADDER_RUNGS }, (_, i) =>
                    Array.from({ length: v.firstWord.length }, (_, j) => (steps[i] || '')[j] || '')),
            }
        },
    },
    riddle: {
        variants: Object.values(content.ezRiddles),
        clue: v => v.text,
        check: checkText,
    },
    caesar: {
        variants: Object.values(content.caesar),
        clue: v => v.encoded,
        check: checkText,
    },
    anagram: {
        variants: Object.values(content.anagram),
        clue: v => v.mixedText.toUpperCase(),
        check: checkText,
    },
    morse: {
        variants: Object.values(content.morse),
        clue: v => v.encoded,
        check: checkText,
    },
    finalRiddle: {
        variants: [content.finalRiddle],
        clue: v => v.text,
        check: checkText,
    },
}

for (const p of puzzles) {
    if (!types[p.type]) {
        throw new Error(`Puzzle "${p.slug}" has unknown type "${p.type}"`)
    }
}

const randomVariant = (type) => Math.floor(Math.random() * type.variants.length)

function renderPuzzle(req, res, v, { status = 200, error = null, answer = '' } = {}) {
    const puzzle = req.puzzle
    const type = types[puzzle.type]
    const variant = type.variants[v]

    res.status(status).render('puzzle', {
        title: puzzle.title,
        total: `Puzzle ${req.puzzleIndex + 1} of ${puzzles.length}`,
        slug: puzzle.slug,
        type: puzzle.type,
        v,
        prompt: puzzle.prompt,
        hint: puzzle.hint || null,
        story: puzzle.story || null,
        clue: type.clue ? type.clue(variant) : null,
        ladder: type.ladder ? type.ladder(variant, answer) : null,
        error,
        answer,
    })
}

router.get('/', (req, res) => {
    res.render('index', { firstSlug: puzzles[0].slug })
})

router.get('/puzzle/:slug', gate, (req, res) => {
    renderPuzzle(req, res, randomVariant(types[req.puzzle.type]))
})

router.post('/puzzle/:slug', gate, async (req, res, next) => {
    try {
        const type = types[req.puzzle.type]
        const body = req.body || {}
        const v = Number(body.v)
        const variant = type.variants[v]

        const result = validateAnswer(req.body)
        if (result.error) {
            return renderPuzzle(req, res, variant ? v : randomVariant(type), {
                status: 400,
                error: result.error,
                answer: typeof body.answer === 'string' ? body.answer : '',
            })
        }

        // Missing or tampered number: show a fresh word
        if (!variant) return res.redirect(`/puzzle/${req.puzzle.slug}`)

        const error = await type.check(variant, result.answer)
        if (error) {
            return renderPuzzle(req, res, v, { error, answer: result.answer })
        }

        const nextPuzzle = puzzles[req.puzzleIndex + 1]
        res.redirect(nextPuzzle ? `/puzzle/${nextPuzzle.slug}` : `/victory/${victorySlug}`)
    } catch (err) {
        next(err)
    }
})

router.get('/victory/:slug', (req, res, next) => {
    if (req.params.slug !== victorySlug) return next()
    res.render('victory')
})

module.exports = router