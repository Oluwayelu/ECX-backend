import isArray from 'isarray'

const checkArray = arr => {
    if(isArray(arr)){
        console.log(arr + ' is an Array')
    } else {
        console.log(arr + ' is not an Array')
    }
}

//test
checkArray(1)