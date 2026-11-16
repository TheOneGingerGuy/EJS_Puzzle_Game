const path = require('path')
const express = require('express')
const puzzles = require('./data/puzzles')

const app = express()

app,set('view engine', 'ejs')
app.set('views', path.join(__dirname,'views'))
app.use(express.static(path.join(__dirname,'public')))

app.get('/', (req,res)=>{
    const query = req.query.q || ''
    const needle = query.trim().toLowerCase()
    const matches = needle
    ? puzzles.filter(d => d.name.toLowerCase().includes(needle))
    : puzzles

    res.render('index', {
        puzzles:matches,
        query:query,
        total:puzzles.length
    })
})

app.get('/puzzle/:id',(req,res)=>{
    const puzzle = puzzles.find(d => d.id === req.params.id)
    if(!puzzle)
        return res.status(404).render('404',{
    id:req.params.id, total : puzzle.length})
})
app.listen(5000, ()=> console.log(`Dino-Dictionary on http://localhost:5000`))