/*
Day 10 of 30 Days of Code

Write a program that checks if a string is an email address or not with Regular
Expression.

Created on Fri Apr 3 11:36:29am 2020

@author: Oluwayelu Ifeoluwa
*/

const emailChecker = email =>{
  const match = /^\w+([\_-]?\w+)*@\w*(\.\w{2,3})+$/
  match.test(email) ? console.log(true) : console.log(false)
}

//test
emailChecker("ecx_@gmail.com") //true
emailChecker("ecx") //false
