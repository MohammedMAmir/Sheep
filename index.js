const express = require('express')
const app = express()
const path = require('path')
const PORT = process.env.PORT || 3000
const {  logger } = require('./middleware/logger')
const mongoose = require('mongoose');
require('dotenv').config();

const mongoString = process.env.DATABASE_URL

mongoose.connect(mongoString);
const database = mongoose.connection

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

app.use(logger)
app.use(express.json())
app.use('/', express.static(path.join(__dirname, '/public')))
app.use('/', require('./routes/root'))

app.all('*', (req, res) => {
    res.status(404)
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if(req.accepts('json')){
        res.json({message: '404 Not Found'})
    }else{
        res.type('txt').send('404 Not Found')
    }
})

app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`)
})
