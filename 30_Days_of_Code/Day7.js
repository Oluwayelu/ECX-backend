/*
Day 7 of 30 Days of Code

Write a JavaScript program to get the first n Fibonacci numbers. Note : The Fibonacci
Sequence is the series of numbers: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, . . . Each subsequent
number is the sum of the previous two.

Created on Tue Mar 31 3:56:12pm 2020
Updated on Tue Mar 31 5:23:34pm 2020

@author: Oluwayelu Ifeoluwa
*/
  
//Solved with Iteration
const donFibIterative = n => {
  let ar = [0, 1]
  for(let i = 2; i<=n; i++){
    ar.push(ar[ar.length-1] + ar[ar.length-2])
  }
  return ar[n]
}

//Solved with Recursion
const donFibRecursive = n => {
  if (n < 2) {
    return n
  }
  return donFibRecursive(n-1) + donFibRecursive(n-2)
}

//test
console.log(donFibIterative(7)) //13
console.log(donFibRecursive(7)) //13
