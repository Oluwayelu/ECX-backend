/*

Day 2 of 30 Days of Code

Write a JavaScript function to validate whether an argument of a given value type is error or not.

Created on Thur Mar 26 12:45:36pm 2020

@author: Oluwayelu Ifeoluwa

*/

const errorCheck = (value) => {
   return value instanceof Error || toString.call(value) === '[object Error]';
}

//test
console.log(errorCheck(new Error("ECX")))
console.log(errorCheck("ECX"))
