// const fs = require('fs');

// (async () => {
//     console.time("copyFile");

//     const readStream = fs.createReadStream("read.txt", { encoding: "utf-8" });
//     const writeStream = fs.createWriteStream("text.txt", { encoding: "utf-8" });

//     readStream.on("error", (err) => {
//         console.error("Read error:", err);
//     });

//     writeStream.on("error", (err) => {
//         console.error("Write error:", err);
//     });

//     writeStream.on("finish", () => {
//         console.timeEnd("copyFile");
//         console.log("File copy completed.");
//     });

//     // Pipe the read stream into the write stream
//     readStream.pipe(writeStream);
// })();


const fs = require('fs');
const { pipeline } = require('stream/promises');

(async () => {
    console.time("copyFile");

    try {
        await pipeline(
            fs.createReadStream("read.txt", { encoding: "utf-8" }),
            fs.createWriteStream("text.txt", { encoding: "utf-8" })
        );

        console.timeEnd("copyFile");
        console.log("File copy completed.");
    } catch (err) {
        console.error("Pipeline failed:", err);
    }
})();

