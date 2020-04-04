/*
Day 11 of 30 Days of Code

Write a program that takes in a date of birth of a person and returns the
number of days till the next birthday.

Created on Sat Apr 4 7:34:21pm 2020

@author: Oluwayelu Ifeoluwa
*/

const birthDays = dateOfBirth =>{
  //Date Format: dd-mm-yyyy
  const dateReg = /^\d{2}[-]\d{2}[-]\d{4}$/
  
  if(dateOfBirth.match(dateReg)){
    dateOfBirth = dateOfBirth.split("-")
    var dd = parseInt(dateOfBirth[0])
    var mm = parseInt(dateOfBirth[1])
    var yy = parseInt(dateOfBirth[2])
    var listOfDays =[31,28,31,30,31,30,31,31,30,31,30,31]
    
    //Validation of date
    if(mm === 1 || mm > 2){
      
      if(dd > listOfDays[mm - 1]){
        return "Invalid date"
      }
    }
    else if(mm === 2){
      //checking for leap year
      var lyear = false
      if(yy % 4 === 0){
        lyear = true
      }
      if(lyear == false && dd > 28){
        return "Invalid date"
      }
      else if(lyear == true && dd > 29){
        
        return "Invalid date"
      }
    }
    
    const today = new Date
    const birthday = new Date(today.getFullYear(), mm - 1,dd)
  
    if(today > birthday){
      birthday.setFullYear(today.getFullYear()+1)
    }
    
    //converting millisecond to day
    const msd = 1000*60*60*24
    
    var days = Math.ceil((birthday-today)/msd)
    return days.toString() + " Days"
    
  } else{
    
    return "Incorrect date format, use dd-mm-yyyy"
  }
}

//test
console.log(birthDays("19-04-2000")) //15
console.log(birthDays("19/04/2000")) //Incorrect
