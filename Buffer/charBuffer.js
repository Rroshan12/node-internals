// 0100 1000 0110 1001 0010 0001
const { Buffer } = require("buffer");


const buff = Buffer.alloc(3);

buff[0] = 0x48;
buff[1] = 0x69;
buff[2] = 0x21;

const buff2 = Buffer.from([0x48, 0x69, 0x21])
const buff3 = Buffer.from("hello");


console.log(buff2.toString("utf-8")) // utf-8 means english encoding
console.log(buff3.toString("utf-8"))

