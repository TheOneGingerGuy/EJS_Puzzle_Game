const { puzzles } = require('../data/puzzles')

function gate(req,res,next){
    const index = puzzles.findIndex(p => p.slug === req.params.slug)
    if(index === -1){
        return res.status(404).render('not-found')
    }

    req.puzzle = puzzles[index]
    req.puzzleIndex = index
    next()
}

module.exports = gate