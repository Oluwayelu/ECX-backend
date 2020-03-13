const bcrypt = require('bcrypt')
const db = require('./db')

const checkUser = (name, pass) => {
    if(db.name === name) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(db.password, salt, (err, hash) => {
                db.password = hash
                console.log(db.password)
                bcrypt.compare(pass, db.password, (err, result) => {
                    if(result) {
                        console.log("Password Correct")
                    } else {
                        console.log("Password Incorrect")
                    }
                })
            })
        })
    } else {
        console.log('User does not exist')
    }
}

//Test data
let name = "Ifeoluwa"
let password = "1234534"

checkUser(name, password)