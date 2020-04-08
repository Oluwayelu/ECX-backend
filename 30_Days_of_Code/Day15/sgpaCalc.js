const sgpaCalc = courses => {
    let add = 0
    let totalUnits = 0
    let inavlidScore = false
    courses.forEach(course => {
        let grade = 0
        if(course.score >= 70 && course.score <= 100){
            grade = 5
        }
        else if(course.score >= 60 && course.score < 70){
            grade = 4
        }
        else if(course.score >= 50 && course.score < 60){
            grade = 3
        }
        else if(course.score >= 45 && course.score < 50){
            grade = 2
        }
        else if(course.score >= 40 && course.score < 45){
            grade = 1
        }
        else if(course.score >= 0 && course.score < 40){
            grade = 0
        } else {
            inavlidScore = true
        }
        add += course.units * grade
        totalUnits += course.units 
    })
    if(!inavlidScore){
        return add/totalUnits
    } else {
        return "A score is either greater than 100 or less than 0"
    }
    
}

module.exports = sgpaCalc