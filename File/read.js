const fs = require('fs');

const content =  fs.readFilesync('./text.txt')

console.log( content) //buffer
console.log(content.toString("utf-8"))