const express = require('express')
const router = express.Router()

const puzzles = require('../data/puzzles')
const { checkAnswer } = require('../lib/answers')
const gate = require ('../middleware/gate')

router.get('/', (req,res)=>{
    res.render('index', {puzzles})
})

router.get('/puzzle/:id', gate, (req,res, next) => {
    const puzzle = puzzles.find(p => String(p.id) === req.params.id);
    if (!puzzle) return next();
    res.render('puzzle', {puzzle, error: null})
})

router.post('/puzzle/:id', gate, (req,res,next)=>{
    const index = puzzles.findIndex(p => String(p.id) === req.params.id)
    if(index === -1) return next()
    const puzzle = puzzles[index]
    const guess = (req.body.answer || '').trim()

    if (!checkAnswer(puzzle.id, guess)) {
        return res.render('puzzle', {puzzle, error: 'Not quite, try again!'})
    }

    const nextPuzzle = puzzles[index + 1]
    res.redirect(nextPuzzle ? `/puzzle/${nextPuzzle.id}` : '/victory')
})

router.get('/victory', (req,res)=>{
    res.render('victory')
})

module.exports = router