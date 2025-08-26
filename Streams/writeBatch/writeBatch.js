const fs = require("fs/promises");

(async () => {
    console.time("writeMany");
    const fileHandler = await fs.open("test.txt", "w");
    const stream = fileHandler.createWriteStream();

    let i = 0;
    let j = 0;
    const max = 100_000_000;
    const batchSize = 100_000;
    let lineChar = 0; // Tracks how many numbers on the current line
    const maxPerLine = 100; // Insert newline after every 100 numbers

    function writeMany() {
        let canContinue = true;

        while (i < max && j < batchSize && canContinue) {
            let buff;

            if (lineChar === maxPerLine) {
                buff = Buffer.from(`${i}\n`, "utf-8"); // Insert newline
                lineChar = 0;
            } else {
                buff = Buffer.from(`${i} `, "utf-8");
                lineChar++;
            }

            canContinue = stream.write(buff);
            i++;
            j++;
        }

        if (i >= max) {
            stream.end(); // Done writing all
            return;
        }

        if (j >= batchSize) {
            j = 0; // Reset batch counter
            setImmediate(writeMany);
        } else if (!canContinue) {
            stream.once("drain", writeMany);
        }
    }

    stream.on("finish", () => {
        console.timeEnd("writeMany");
        fileHandler.close();
    });

    stream.on("error", (err) => {
        console.error("Stream error:", err);
    });

    writeMany();
})();
