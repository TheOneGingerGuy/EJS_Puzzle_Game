const express = require('express')
const router = express.Router()

const { content, puzzles } = require('../data/puzzles')
const { normalize } = require('../lib/answers')
const gate = require('../middleware/gate')

const VICTORY_SLUG = 'gilded-owl-77'
const caesarWords = Object.values(content.ceasar)

router.get('/', (req, res) => {
  res.render('index', { firstSlug: puzzles[0].slug })
})

router.get('/puzzle/:slug', gate, (req, res) => {
  const v = Math.floor(Math.random() * caesarWords.length)
  res.render('puzzle', {
    title: req.puzzle.title,
    encoded: caesarWords[v].encoded,
    v,
    slug: req.puzzle.slug,
    error: null,
  })
})

router.post('/puzzle/:slug', gate, (req, res) => {
  const v = Number(req.body.v)
  const word = caesarWords[v]

  // Missing or tampered number: show a fresh word
  if (!word) return res.redirect(`/puzzle/${req.puzzle.slug}`)

  if (normalize(req.body.answer || '') !== normalize(word.answer)) {
    return res.render('puzzle', {
      title: req.puzzle.title,
      encoded: word.encoded,
      v,
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