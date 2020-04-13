const dateTimeUtils = () => {
    const dateTime = new Date()

    let date = `${dateTime.getDate()}-${dateTime.getMonth() + 1}-${dateTime.getFullYear()}`
    let time = dateTime.getHours() > 12 ? 
        `${dateTime.getHours() - 12}:${dateTime.getMinutes()}pm` : 
        `${dateTime.getHours()}:${dateTime.getMinutes()}am`
    return { date, time }
}

module.exports = dateTimeUtils