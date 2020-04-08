const express = require('express')
const sgpaCalc = require('./sgpaCalc')

const app = express()
const port = process.env.PORT || 8000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))


//Routes
let sgpa
app.post('/createdata', (req, res) => {

    sgpa = sgpaCalc(req.body.courses)    
    res.status(200).json({ msg: 'Data sent' })
})

app.get('/getdata', (req, res) => {
    res.status(200).json({ sgpa: sgpa })
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})