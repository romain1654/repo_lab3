const express = require('express')
const app = express()

const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv/config')

app.use(bodyParser.json())

const filmsRoute = require('./routes/films')
const authRoute = require('./routes/auth')

app.use('/api/films', filmsRoute)
app.use('/api/user', authRoute)

app.get('/', (req, res) => {
    res.send('homepage')
})

mongoose.connect(process.env.DB_CONNECTOR).then(console.log("The DB is connected"))

app.listen(3000, () => {
    console.log("The app is up and running")
})