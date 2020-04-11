/*
Day 0 of 30 Days of Code

Write a program to display the current day and time in the following format.
Sample Output: 
Today is : Tuesday.
Current time is: 10PM:30:38


Created on Tue Mar 24 04:45:20 2020

@author: Oluwayelu Ifeoluwa
*/
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
let hours 

new Date().getSeconds() > 12 ? hours = `${new Date().getHours() - 12}PM` : hours = `${new Date().getHours()}AM`

console.log(`Today is: ${days[new Date().getDay() - 1]}`)
console.log(`Current time is : ${hours}:${new Date().getMinutes()}:${new Date().getSeconds()} `)