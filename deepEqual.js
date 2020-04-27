


function isPresent(keys2, key1) {
    for (let j = 0; j < keys2.length; j++) {
        if (keys2[j] === key1) {
            return keys2[j]
        }
    }
    return null
}


function deepEqual(ob1, ob2){
    if (ob1 === null && ob2 === null){
        return true
    } else if ((ob1 === null && ob2 != null) || (ob1 != null && ob2 === null)){
        return false
    } else {
        if (typeof ob1 != "object" && typeof ob2 != "object"){
            // console.log("-1")
            if (typeof ob1 === typeof ob2){
                // console.log("0")
                if (ob1 === ob2){
                    // console.log("1")
                    return true
                } else {
                    // console.log("2")
                    return false
                }
            } else {
                // console.log("3")
                return false
            }
        } else if (typeof ob1 === "object" && typeof ob2 === "object"){
            // console.log("4")
            const keys1 = Object.keys(ob1)
            const keys2 = Object.keys(ob2)
    
    
            if (keys1.length != keys2.length){
                // console.log("5")
                return false
            } else {
                // console.log("6")
                for (let i = 0; i < keys1.length; i++){
                    const key1 = keys1[i]
                    const key2 = isPresent(keys2, key1)
                    if (key2 === null) {
                        // console.log("7")
                        return false
                    } else {
                        // console.log("8")
                        if (typeof key1 === typeof key2) {
                            // console.log("9")
                            if (!(deepEqual(ob1[key1], ob2[key2]))) {
                                return false
                            }        
                        }
                    }
                }
                return true
            }
        } else {
            // console.log("16")
            return false
        }
    }


    
}



const str = "ABCD"
const str1 = "ABCD"

const o1 = {
    b: "b",
    a: "a", 
    c: {
        d: "d",
    }
}


const o2 = {
    a: "a",
    b: "b",
    c: {
        d: "d"
    }
}

console.log(deepEqual(str, str1))
console.log(deepEqual(str, o1))
console.log(deepEqual(o2, o1))