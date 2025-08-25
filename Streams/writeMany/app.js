const fs = require("fs/promises");
const fp = require("fs");


//31 sec max will be in order
(async () => {

    console.time("writeMany")
    const fileHandler = await fs.open("text.txt", "w");

    for (let i = 0; i < 1000000; i++) {
        await fileHandler.write(`${i} `)
    }
    console.timeEnd("writeMany");
})();



//0,275ms random order 
(() => {
    console.time("writeMany")
    fp.open("text.txt", "w", (err, fd) => {

        for (let i = 0; i < 1000000; i++) {
            fp.write(fd, `${i} `, () => {

            })
        }

    });
    console.timeEnd("writeMany");
})();