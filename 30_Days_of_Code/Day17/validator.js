const emailValidator = email =>{
    const match = /^\w+([\_-]?\w+)*@\w*(\.\w{2,3})+$/

    if(match.test(email)){
        return true
    } else {
        return false
    }
}

const passwordValidator = password => {
    if(password.length >= 6) {
        return true
    } else {
        return false
    }
}

module.exports = { emailValidator, passwordValidator }