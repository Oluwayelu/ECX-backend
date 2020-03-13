const bcrypt = require('bcrypt')
const db = require('./db')

const checkUser = (name, pass) => {
    let userFound = false
    db.map(data => {
        if(name === data.name){
            userFound = true
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(data.password, salt, (err, hash) => {
                    data.password = hash
                    bcrypt.compare(pass, data.password, (err, res) => {
                        if(res) {
                            console.log(data.name+' is '+data.age+' years old. His matriculation number is '+data.matric+'. He is in '+data.dept+'. He was born on '+data.DOB+'.')
                        } else {
                            console.log("Password Incorrect")
                        }
                    })
                })
            })
        } 
    })
    if (userFound === false) {
        console.log("User not found")
    }
}


checkUser("David", "asdfg")