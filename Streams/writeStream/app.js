const fs = require("fs/promises");

(async () => {

    console.time("writeMany")
    const fileHandler = await fs.open("test.txt", "w");
    const stream = fileHandler.createWriteStream();

    for (let i = 0; i < 1000000; i++) {
        const buff = Buffer.from(`${i} `,"utf-8")
        stream.write(buff)
    }
    console.timeEnd("writeMany");
})();
