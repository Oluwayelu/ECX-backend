
/*
Day 8 of 30 Days of Code

Write a JavaScript program to get convert numbers from Arabic to Roman numerals

Created on Wed Apr 1 1:56:17pm 2020

@author: Oluwayelu Ifeoluwa
*/
 
//The function converts arabic numbers from 1-3999 to roman numbers perfectly
const romaArabica = num => {
  var romanNum = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1}
  var roman = ''
  for (let i in romanNum) {
     var a = Math.floor(num / romanNum[i])
     num -= a * romanNum[i]
     roman += i.repeat(a)
  }
  return roman
}

//test
console.log(romaArabica(3999)) //MMMCMXCIX
