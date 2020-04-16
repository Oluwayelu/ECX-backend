const dateTimeUtils = (da) => {
    const dateTime = new Date(da)

    var day = ("0" + dateTime.getDate()).slice(-2) + '-' + ("0" + (dateTime.getMonth() + 1)).slice(-2) + '-' + dateTime.getFullYear()
    var time = dateTime.getHours() > 12 ?
        ("0" + (dateTime.getHours() - 12)).slice(-2) + ':' + dateTime.getMinutes() + 'pm' :
        ("0" + dateTime.getHours()).slice(-2) + ':' + dateTime.getMinutes() + 'am'

    var today = day + "-" + time

    return today
}

module.exports = dateTimeUtils