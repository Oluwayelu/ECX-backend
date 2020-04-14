const dateTimeUtils = () => {
    const dateTime = new Date()

    var today = new Date()
    const day = new Date(dateTime.getFullYear(), dateTime.getMonth(), dateTime.getHours(), dateTime.getMinutes(), dateTime.getSeconds())
    let date = `${dateTime.getDate()}-${dateTime.getMonth() + 1}-${dateTime.getFullYear()}`
    let time = dateTime.getHours() > 12 ? 
        `${dateTime.getHours() - 12}:${dateTime.getMinutes()}pm` : 
        `${dateTime.getHours()}:${dateTime.getMinutes()}am`
    return { date, time, day, today }

    // var d = new Date()

    // var datestring = ("0" + d.getDate()).slice(-2) + '-' + ("0" + (d.getMonth() + 1)).slice(-2) + '-' + ("0" + d.getFullYear()).slice(-2) + '-' + ("0" + d.getHours()).slice(-2) + ':' + d.getMinutes()
}

module.exports = dateTimeUtils