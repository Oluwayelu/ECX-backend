/*
Day 7 of 30 Days of Code

Write a JavaScript program to get the first n Fibonacci numbers. Note : The Fibonacci
Sequence is the series of numbers: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, . . . Each subsequent
number is the sum of the previous two.

Created on Tue Mar 31 3:56:12pm 2020

@author: Oluwayelu Ifeoluwa
*/
const donFibonacci = n => {
  let ar = [0, 1]
  for(let i = 0; i<=n; i++){
    ar.push(ar[ar.length-1] + ar[ar.length-2])
  }
  return ar[n]
}

//test
console.log(donFibonacci(7)) //13
