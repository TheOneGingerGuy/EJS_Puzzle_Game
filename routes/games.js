const express = require('express')
const router = express.Router()

const puzzles = require('../data/puzzles')
const { checkAnswer } = require('../lib/answers')
const gate = require('../middleware/gate')

const VICTORY_SLUG = 'gilded-owl-77'
router.get('/', (req, res) => {
  res.render('index', { firstSlug: puzzles[0].slug })
})

router.get('/puzzle/:slug', gate, (req, res) => {
  res.render('puzzle', {
    title: req.puzzle.title,
    prompt: req.puzzle.prompt,
    slug: req.puzzle.slug,
    error: null,
  })
})

router.post('/puzzle/:slug', gate, (req, res) => {
  const guess = req.body.answer || ''

  if (!checkAnswer(req.puzzle, guess)) {
    return res.render('puzzle', {
      title: req.puzzle.title,
      prompt: req.puzzle.prompt,
      slug: req.puzzle.slug,
      error: 'Not quite, try again!',
    })
  }

  const nextPuzzle = puzzles[req.puzzleIndex + 1]
  res.redirect(nextPuzzle ? `/puzzle/${nextPuzzle.slug}` : `/victory/${VICTORY_SLUG}`)
})

router.get('/victory/:slug', (req, res) => {
  if (req.params.slug !== VICTORY_SLUG) {
    return res.status(404).render('not-found')
  }
  res.render('victory')
})

module.exports = router