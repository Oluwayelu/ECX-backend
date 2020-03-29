
/*
Day 5 of 30 Days of Code

Write a JavaScript function that checks whether a passed string is palindrome or not?

Created on Sun Mar 29 2:23:48pm 2020

@author: Oluwayelu Ifeoluwa
*/

const noReverse = value => {
  
  value === value.split("").reverse().join("") ? console.log(true) : console.log(false)
}

//test
noReverse("aba")
