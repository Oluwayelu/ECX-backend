const express = require('express')

const app = express()
const port = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//Routes
let database
app.post('/createdata', (req, res) => {
    database = req.body
    res.status(200).json({ msg: 'Data sent' })
})

app.get('/getdata', (req, res) => {
    res.status(200).json(database)
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})