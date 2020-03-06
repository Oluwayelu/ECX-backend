const bcrypt = require('bcrypt')

let password = "1234"
let newPassword = "1234"

bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
        password = hash
        console.log(password)
        bcrypt.compare(newPassword, password, (err, result) => {
            if(result) {
                console.log("Password Correct")
            } else {
                console.log("Password Incorrect")
            }
        })
    })
})


