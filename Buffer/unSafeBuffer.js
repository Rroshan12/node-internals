const { Buffer } = require("buffer");

const buff = Buffer.allocUnsafe(10000) // make array pool already allocated so faster Buffer.poolSize allocated 8kib

const safeBuff = Buffer.alloc(10000)


//safe buffer not random data
for (let i = 0; i < safeBuff.length; i++) {
    if (safeBuff[i] !== 0) { 
        console.log(`Element at ${i} is ${safeBuff[i].toString(2)}`)
    }

}

//unsafe buffer may got random data
for (let i = 0; i < buff.length; i++) {
    if (buff[i] !== 0) {
        console.log(`Element at ${i} is ${buff[i].toString(2)}`)
    }

}

console.log(Buffer.poolSize) //8kib