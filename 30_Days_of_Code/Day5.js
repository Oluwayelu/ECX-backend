
/*
Day 5 of 30 Days of Code

Write a JavaScript function that checks whether a passed string is palindrome or not?

Created on Sun Mar 29 5:10:08pm 2020

@author: Oluwayelu Ifeoluwa
*/

const noReverse = value => {
  var re = /[\W_]/g;
  value = value.toLowerCase().replace(re, "")
  
  value === value.split("").reverse().join("") ? console.log(true) : console.log(false)
}

//test
noReverse("A man, a plan, a canal. Panama")
