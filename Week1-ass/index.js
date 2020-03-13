//Question 1

class convert{
    toFahrenheit(temp) {
        return (temp * 9/5) + 32
    }

    toCelsius(temp){
        return (temp - 32) * 5/9
    }
}
c = new convert()

//test
console.log(c.toFahrenheit(50))
console.log(c.toCelsius(122))