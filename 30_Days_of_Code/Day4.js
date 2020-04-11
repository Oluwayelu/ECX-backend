/*
Day 4 of 30 Days of Code
Write a JavaScript program to get a list of elements that exist in two separate arrays

Created on Sat Mar 28 3:35:08pm 2020

@author: Oluwayelu Ifeoluwa
*/

const intersectionEye = (arr1, arr2) =>{
  arr2 = new Set(arr2)
  
  return arr1.filter(x => arr2.has(x))
}

//test
console.log(intersectionEye([1,6,2,3], [3,5,6,2]))
