const express = require('express')
const router = express.Router()

const { content, puzzles } = require('../data/puzzles')
const { checkAnswer } = require('../lib/answers')
const gate = require('../middleware/gate')

const VICTORY_SLUG = 'gilded-owl-77'
const caesarWords = Object.values(content.caesar)
const riddles = Object.values(content.ezRiddles)

function showCaesar(req, res) {
  const v = Math.floor(Math.random() * caesarWords.length)
  res.render('puzzle', {
    title: req.puzzle.title,
    encoded: caesarWords[v].encoded,
    v,
    slug: req.puzzle.slug,
    error: null,
  })
}

function checkCaesar(req, res) {
  const v = Number(req.body.v)
  const word = caesarWords[v]
  if (!word) return res.redirect(`/puzzle/${req.puzzle.slug}`)

  if (!checkAnswer(req.body.answer, word, 'text')) {
    return res.render('puzzle', {
      title: req.puzzle.title,
      encoded: word.encoded,
      v,
      slug: req.puzzle.slug,
      error: 'Try again!',
    })
  }
  nextStep(req, res)
}

function showRiddle(req, res) {
  const v = Math.floor(Math.random() * riddles.length)
  res.render('puzzles/easyRiddle', {
    title: req.puzzle.title,
    riddle: riddles[v].text,
    v,
    slug: req.puzzle.slug,
    error: null,
  })
}

function checkRiddle(req, res) {
  const v = Number(req.body.v)
  const riddle = riddles[v]
  if (!riddle) return res.redirect(`/puzzle/${req.puzzle.slug}`)

  if (!checkAnswer(req.body.answer, riddle, 'text')) {
    return res.render('puzzles/easyRiddle', {
      title: req.puzzle.title,
      riddle: riddle.text,
      v,
      slug: req.puzzle.slug,
      error: 'Try again!',
    })
  }
  nextStep(req, res)
}
function showAnagram(req, res) {
  res.render('puzzles/anagram', {
    title: req.puzzle.title,
    mixed: content.anagram.mixedText,
    slug: req.puzzle.slug,
    error: null,
  })
}

function checkAnagram(req, res) {
  if (!checkAnswer(req.body.answer, content.anagram, 'text')) {
    return res.render('puzzles/anagram', {
      title: req.puzzle.title,
      mixed: content.anagram.mixedText,
      slug: req.puzzle.slug,
      error: 'Try again!',
    })
  }
  nextStep(req, res)
}

function nextStep(req, res) {
  const nextPuzzle = puzzles[req.puzzleIndex + 1]
  res.redirect(nextPuzzle ? `/puzzle/${nextPuzzle.slug}` : `/victory/${VICTORY_SLUG}`)
}

const showHandlers = { caesar: showCaesar, riddle: showRiddle, anagram: showAnagram }
const checkHandlers = { caesar: checkCaesar, riddle: checkRiddle, anagram: checkAnagram }

router.get('/puzzle/:slug', gate, (req, res) => showHandlers[req.puzzle.type](req, res))
router.post('/puzzle/:slug', gate, (req, res) => checkHandlers[req.puzzle.type](req, res))

router.get('/', (req, res) => {
  res.render('index', { firstSlug: puzzles[0].slug })
})

router.get('/victory/:slug', (req, res) => {
  if (req.params.slug !== VICTORY_SLUG) {
    return res.status(404).render('not-found')
  }
  res.render('victory', { firstSlug: puzzles[0].slug })
})

module.exports = router