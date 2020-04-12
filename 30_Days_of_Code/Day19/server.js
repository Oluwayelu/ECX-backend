/*
Day 19 of 30 Days of Code

Task:
    

Created on Sun Apr 12 3:39:58pm 2020

@author: Oluwayelu Ifeoluwa
*/

const express = require('express')
const mongoose = require('mongoose')

const db = require('./config/config').mongoURI

const user = require('./routes/api/Users')

const app = express()
const port = process.env.PORT || 8000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

mongoose.connect(db, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true, 
    useFindAndModify: false
}, () => {
    console.log('mongoDB connected')
})

//routes
app.use('/', user)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})