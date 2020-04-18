const fs = require('fs')

exports.log = (req, res) => {
    var readStream = fs.createReadStream('logs', 'utf8')

    let data = ''

    readStream.on('data', (chunk) => {
        data += chunk
        console.log(chunk)
    }).on('end', () => {
    
        res.status(200).send(data)
    })
}