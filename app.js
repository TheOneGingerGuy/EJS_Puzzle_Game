const path = require('path')
const express = require('express')

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))

app.use('/', require('./routes/games'))

app.use((req, res) => {
    res.status(404).render('not-found', { id: req.originalUrl })
})
app.use((err, req, res, next) => {
    console.error(err)
    res.status(500).render('error', { message: err.message })
})

app.listen(5000, () => console.log(`The Depths of Doom and Despair and Destruction and Death on http://localhost:5000`))