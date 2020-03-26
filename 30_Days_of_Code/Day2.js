/*

Day 2 of 30 Days of Code

Write a JavaScript function to validate whether an argument of a given value type is error or not.

Created on Thur Mar 26 12:45:36pm 2020

@author: Oluwayelu Ifeoluwa

*/

const errorChecker = (value, valueType) => {
  typeof(value) !== valueType ? console.log("Error") : console.log("No error")
}

//test
errorChecker("ECX", "string")
