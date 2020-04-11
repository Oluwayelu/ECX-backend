/*
Day 18 of 30 Days of Code

Task:
    Using ExpressJs or the native Http module, write a server that takes in username, email
    and password from a SIGNUP route to create a user, and has a LOGIN route to
    authenticate the user using the password and the email or username​. As a step farther,
    reimplement the signup route to be able save the time and date the user signed up and
    have that data ready on a protected ‘’getuser” route. The “getuser” route will take in the
    user’s email. On a user’s authenticated login through the “login”​, return a session token
    (tokenize the email) as the response to make sure only an authenticated user with that
    token can access the “getuser” route; this token will be sent with the “getuser” request in
    the request header as the value of the “​Authorization​” key; it will have a “Bearer” prefix.
    The token will be verified on each “getuser” request to be sure the session token is valid
    and has not expired​.

    As a follow up from previous work, create a local MongoDB instance and a
    user collection to store each user's details in the database and this time the
    “getuser” route will return a generatedObjectID along with the data
    previously stored in the database (the user should be retrieved with either
    email or username). Remember to use the Mongoose ORM (Object
    Relational Mapper). Enjoy :-)

Created on Sat Apr 11 10:54:18am 2020
Updated on Sat Apr 11 6:52:10pm 2020

@author: Oluwayelu Ifeoluwa
*/

const express = require('express')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

const db = require('./config/config').mongoURI

const user = require('./routes/api/Users')

const app = express()
const port = process.env.PORT || 8000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, () => {
    console.log('mongoDB connected')
})

//routes
app.use('/', user)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})