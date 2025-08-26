const fs = require("fs/promises");

(async () => {

    console.time("writeMany")
    const fileHandler = await fs.open("test.txt", "w");
    const stream = fileHandler.createWriteStream();

    // console.log(stream.writableHighWaterMark)   //16383
    // console.log(stream.writableLength)

    // const buff = Buffer.from('hello');

    // stream.write(buff);

    // console.log(stream.writableLength);



    // const buff = Buffer.alloc(16384, 10);

    // console.log(stream.write(buff), buff, stream.writableLength)

    // stream.on("drain", ()=>{

    //     console.log(stream.writableLength,'inside drain')

    // })


    let i = 0;
    function writeMany() {
        while (i < 100000000) {
            const buff = Buffer.from(`${i} `, "utf-8")

            if (!stream.write(buff)) {
                break;
            }
            i++;
        }
    }


    writeMany();



    stream.on("drain", () => {

        writeMany();

    })
    console.timeEnd("writeMany");
})();