const dateTimeUtils = (da) => {
    const dateTime = new Date(da)

    var today = ("0" + dateTime.getDate()).slice(-2) + '-' + ("0" + (dateTime.getMonth() + 1)).slice(-2) + '-' + ("0" + dateTime.getFullYear()).slice(-2) + '-' + ("0" + dateTime.getHours()).slice(-2) + ':' + dateTime.getMinutes()
    const day = new Date(dateTime.getFullYear(), dateTime.getMonth(), dateTime.getHours(), dateTime.getMinutes(), dateTime.getSeconds())
    let date = `${dateTime.getDate()}-${dateTime.getMonth() + 1}-${dateTime.getFullYear()}`
    let time = dateTime.getHours() > 12 ? 
        `${dateTime.getHours() - 12}:${dateTime.getMinutes()}pm` : 
        `${dateTime.getHours()}:${dateTime.getMinutes()}am`
    return { date, time, day, today }

    // var d = new Date()

    // var datestring = ("0" + dateTime.getDate()).slice(-2) + '-' + ("0" + (dateTime.getMonth() + 1)).slice(-2) + '-' + ("0" + dateTime.getFullYear()).slice(-2) + '-' + ("0" + dateTime.getHours()).slice(-2) + ':' + dateTime.getMinutes()
}

module.exports = dateTimeUtils