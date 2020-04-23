const express = require('express')
const fs = require('fs')
const cors = require('cors')
const path = require('path')
const morgan = require('morgan')
const mongoose = require('mongoose')

const db = require('./config/keys').mongoURI
const corsOption = require('./middleware/cors')

const userRoutes = require('./routes/api/Users')
const cartRoutes = require('./routes/api/Cart')
const storeRoutes = require('./routes/api/Store')
const productRoutes = require('./routes/api/Product')

const app = express()
const port = process.env.PORT || 8000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(morgan(':method :url :status :response-time ms', {
    stream: fs.createWriteStream(path.join(__dirname, 'logs'))
}))


mongoose.connect(db, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true, 
    useFindAndModify: false
}, () => {
    console.log('mongoDB connected')
})

app.use('/api/users', cors(corsOption), userRoutes)
app.use('/api/cart', cors(corsOption), cartRoutes)
app.use('/api/store', cors(corsOption), storeRoutes)
app.use('/api/product', cors(corsOption), productRoutes)

app.listen(port, () => console.log(`Server running on port ${port}`))