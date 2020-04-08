const express = require('express')
const sgpaCalc = require('./sgpaCalc')

const app = express()
const port = process.env.PORT || 8000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

let sgpa

// @route   POST /createdata
// @desc    calculates the sgpa of the courses sent to the server
// @access  Public
app.post('/createdata', (req, res) => {

    sgpa = sgpaCalc(req.body.courses)    
    res.status(200).json({ msg: 'Data sent' })
})

// @route   GET /getdata
// @desc    sends the sgpa to the user
// @access  Public
app.get('/getdata', (req, res) => {
    res.status(200).json({ sgpa: sgpa })
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
