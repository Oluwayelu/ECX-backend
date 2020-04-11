/*
Day 3 of 30 Days of Code

Write a JavaScript function to count how many vowels are in an argument string.

Created on Fri Mar 27 5:45:42pm 2020

@author: Oluwayelu Ifeoluwa
*/

const monoTong = word => {
  let count  = 0;
  let vowels = "aeiou";
   
  for(i in word){
    vowels.includes(word.toLowerCase()[i]) ? count += 1 : count;
  }
  return count.toString();
 }

//test
console.log(monoTong("abc"))
