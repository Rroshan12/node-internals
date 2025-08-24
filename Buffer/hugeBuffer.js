const {Buffer} = require("node:buffer");


const b = Buffer.alloc(4e9)


setInterval(()=>{
for(let i=0; i< b.length; i++) //b.length size of buffer in bytes
{
    b[i] = 0x222;

}
}, 5000)



