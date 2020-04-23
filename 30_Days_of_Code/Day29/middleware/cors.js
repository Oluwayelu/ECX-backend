let whitelist = ['http://localhost:8000']
var corsOption = {
    origin: (origin, call) => {
        if(!origin) return call(null, true)
        if(whitelist.indexOf(origin) === -1){
            var msg = 'The CORS policy for this origin does not allow access from the particular origin'
            return call(new Error(msg), false)
        }
        return call(null, true)
    }
}

module.exports = corsOption