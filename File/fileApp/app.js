const fs = require("fs/promises");

const CREATE_FILE = "create";
const DELETE_FILE = "delete";
const RENAME_FILE = "rename";
const UPDATE_FILE = "update";

(async () => {
    const watcher = fs.watch('./', { encoding: 'utf-8' });

    for await (const event of watcher) {
        if (event.eventType === 'change' && event.filename === 'command.txt') {
            const data = await readFile(event.filename);

            if (data.includes(CREATE_FILE)) {
                const path = data.substring(CREATE_FILE.length + 1).trim();
                const res = await createFile(path);
                console.log(res);
            }

            if (data.includes(DELETE_FILE)) {
                const path = data.substring(DELETE_FILE.length + 1).trim();
                const res = await deleteFile(path);
                console.log(res);
            }

            if (data.includes(RENAME_FILE)) {
                const args = data.substring(RENAME_FILE.length + 1).trim().split(" ");

                console.log(args,"args");
                const res = await renameFile(args[0], args[1]);
                console.log(res);
            }

            if (data.includes(UPDATE_FILE)) {
                const args = data.substring(UPDATE_FILE.length + 1).trim().split(" ");
                const filename = args[0];
                const content = args.slice(1).join(" "); // rest is content
                const res = await updateFile(filename, content);
                console.log(res);
            }
        }
    }
})();

// Read file content
async function readFile(filename) {
    try {
        const fileHandler = await fs.open('./' + filename, "r");
        const size = (await fileHandler.stat()).size;
        const buff = Buffer.alloc(size);
        await fileHandler.read(buff, 0, size, 0);
        await fileHandler.close();
        return buff.toString('utf-8');
    } catch (error) {
        console.error("Error reading file:", error);
        return "";
    }
}

// Create file
async function createFile(filePath) {
    try {
        await fs.writeFile(filePath, "", { flag: 'wx' }); // fail if exists
        return `File created: ${filePath}`;
    } catch (error) {
        return `Error creating file: ${error.message}`;
    }
}

// Delete file
async function deleteFile(filePath) {
    try {
        await fs.unlink(filePath);
        return `File deleted: ${filePath}`;
    } catch (error) {
        return `Error deleting file: ${error.message}`;
    }
}

// Rename file
async function renameFile(oldName, newName) {
    try {
        await fs.rename(oldName, newName);
        return `File renamed from ${oldName} to ${newName}`;
    } catch (error) {
        return `Error renaming file: ${error.message}`;
    }
}

// Update file (overwrite content)
async function updateFile(filename, content) {
    try {
        await fs.writeFile(filename, content, { flag: 'w' }); // overwrite
        return `File updated: ${filename}`;
    } catch (error) {
        return `Error updating file: ${error.message}`;
    }
}
