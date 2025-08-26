const fs = require("fs/promises");

(async () => {
    const fileHandlerRead = await fs.open("text.txt", "r");

    const stream = fileHandlerRead.createReadStream({highWaterMark:400}); //default 65486
stream.on('data',(chunk)=>{
    console.log("......");
    console.log(chunk, chunk.length);
})
})();
