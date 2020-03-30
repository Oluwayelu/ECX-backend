/*
Day 6 of 30 Days of Code

Write a JavaScript program using the map function to return the squares of all the elements in an array.

Created on Mon Mar 30 3:16:31pm 2020

@author: Oluwayelu Ifeoluwa
*/
  
const secretMap = arr =>{
  return arr.map(num => num ** 2)
}

//test
console.log(secretMap([1,2,3])) //[1,4,9]
