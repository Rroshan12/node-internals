const { Buffer } = require("buffer")

const memoryContainer = Buffer.alloc(4);
memoryContainer[0] = 0xff;
memoryContainer.writeInt8(-34, 2)


console.log(memoryContainer)
console.log(memoryContainer[0])


console.log(memoryContainer.readInt8(2))

