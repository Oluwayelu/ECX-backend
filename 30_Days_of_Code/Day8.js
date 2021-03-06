
/*
Day 8 of 30 Days of Code

Write a JavaScript program to get convert numbers from Arabic to Roman numerals

Created on Wed Apr 1 1:56:17pm 2020
Updated on Wed Apr 1 6:04:23pm 2020

@author: Oluwayelu Ifeoluwa
*/
const romaArabica = num => {
  var romanNum = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1}
  
  const toRoman = num => {
    var roman = ''
    for (let i in romanNum) {
       var a = Math.floor(num / romanNum[i])
       num -= a * romanNum[i]
       roman += i.repeat(a)
    }
    return roman
  }
  
  const toBigRoman = n => {
    var ret = '', n1 = '', rem = n;
    while (rem > 1000) {
      var prefix = '', suffix = '', s = '' + rem, mag = 1;
      while (n > 1000) {
        n /= 1000;
        mag *= 1000;
        prefix += '(';
        suffix += ')';
      }
      n1 = Math.floor(n);
      rem = s - (n1 * mag);
      ret += prefix + toRoman(n1) + suffix;
   }
   return ret + toRoman(rem)
 }
  if(num > 3999) return toBigRoman(num)
  return toRoman(num)
}
              

//test
console.log(romaArabica(30999)) //(CD)XCIX
