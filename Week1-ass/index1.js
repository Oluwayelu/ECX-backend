// Question 2

const range = (a,b,c) => {
    if(a >= 1 && a <= 50 || b >= 1 && b <= 50 || c >= 1 && c <= 50) {
        return true
    } else {
        return false
    }
}

//test
console.log(range(90,80,51))