/*
Day 12 of 30 Days of Code

Using a try-catch block, write a function to convert a string to a number and
handle for any exceptions, perform an alternative if need be.

Created on Sun Apr 5 11:40:41pm 2020

@author: Oluwayelu Ifeoluwa
*/

const strinverter = value =>{
  try{
    if(isNaN(Number(value))) throw new Error
    console.log(Number(value))
  } catch(err){
    console.log(err.name)
  }
}

//test
strinverter("12") //12
strinverter("[2,4]") //Error
