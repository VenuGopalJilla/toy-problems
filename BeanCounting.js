

function countBs(str) {
    var count = 0
    for (let i = 0; i < str.length; i++) {
        const letter = str[i]
        if (str[i] === "B") {
            count++
        }
    }
    return count
}

function countChar(str, str1) {
    var count1 = 0
    for(let j = 0; j < str.length; j++){
        const letter1 = str[j]
        if (str[j] === str1) {
            count1++
        }
    }
    return count1
}

var strin = "BBBBBB"
var strin1 = "B"
const num = countBs(strin)
const num1 = countChar(strin, strin1)

console.log("Count of B's in " + strin + " is : " + num)
console.log("Count of B's in " + strin + " is : " + num)