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
    if (!pu)
})