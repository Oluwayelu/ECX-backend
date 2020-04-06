/*
Day 13 of 30 Days of code

Using ExpressJS or the native Http module, write a server that takes in
JSON data from a POST request and returns that same data as a response
from a GET request on another route, data should be sent in the request
body.

Created on Mon Apr 6 12:13:23pm 2020

@author: Oluwayelu Ifeoluwa
*/

const express = require('express')

const app = express()
const port = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

let database
app.post('/createdata', (req, res) => {
    database = req.body
    res.status(200).json({ msg: "Data sent' })
})

app.get('/getdata', (req, res) => {
    res.status(200).json(database)
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
