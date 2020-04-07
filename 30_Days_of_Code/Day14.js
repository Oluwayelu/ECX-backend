/*
Day 14 of 30 Days of Code

Using ExpressJs or the native Http module, write a server that takes in an
array of words from a POST request and returns only the words that are
palindromes as a response from a GET request.

Created on Tue Apr 7 11:52:33am 2020

@author: Oluwayelu Ifeoluwa
*/
const express = require('express')

const app = express()
const port = process.env.PORT || 8000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//Routes
let pWord = []

//Palindrome function 
const palindrome = value => {
    let regex = /[\W_]/g
    value = value.toLowerCase().replace(regex, "")

    if(value === value.split("").reverse().join("")){
        return true
    } else {
        return false
    }
}

// @route   POST /createdata
// @desc    check if data is an array and then check if its a palindrome
// @access  Public
app.post('/createdata', (req, res) => {
    if(!Array.isArray(req.body.words)) {
        res.status(400).json({ msg: 'Words is not an array' })
    }
    req.body.words.forEach(word => {
        palindrome(word) && pWord.push(word) 
    })
    res.status(200).json({ msg: 'Words sent successfully' })
})

// @route   GET /getdata
// @desc    returns palindrome words in the array
// @access  Public
app.get('/getdata', (req, res) => {
    res.status(200).json({ "words": pWord})
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
