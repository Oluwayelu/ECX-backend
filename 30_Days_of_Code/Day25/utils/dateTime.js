const dateTimeUtils = (da) => {
    const dateTime = new Date(da)

    var date = ("0" + dateTime.getDate()).slice(-2) + '-' + ("0" + (dateTime.getMonth() + 1)).slice(-2) + '-' + dateTime.getFullYear()
    var time = dateTime.getHours() > 12 ?
        ("0" + (dateTime.getHours() - 12)).slice(-2) + ':' + ("0" + dateTime.getMinutes()).slice(-2)  + 'pm' :
        ("0" + dateTime.getHours()).slice(-2) + ':' + ("0" + dateTime.getMinutes()).slice(-2) + 'am'

    var today = date + "-" + time

    return { today, date, time }
}

module.exports = dateTimeUtils