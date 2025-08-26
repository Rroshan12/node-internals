const { Transform } = require("node:stream");
const fs = require("node:fs/promises");
const crypto = require("node:crypto");

/**
 * Core Encrypt Transform Stream
 */
class Encrypt extends Transform {
  constructor(secretKey, salt, mode = "encrypt") {
    super();
    this.secretKey = Buffer.from(secretKey);
    this.salt = Buffer.from(salt);
    this.mode = mode; // "encrypt" | "decrypt"
  }

  _transform(chunk, encoding, callback) {
    const keyLen = this.secretKey.length;
    const saltLen = this.salt.length;

    for (let i = 0; i < chunk.length; ++i) {
      const keyByte = this.secretKey[i % keyLen];
      const saltByte = this.salt[i % saltLen];

      if (this.mode === "encrypt") {
        chunk[i] = (chunk[i] + keyByte + saltByte) % 256;
      } else {
        chunk[i] = (chunk[i] - keyByte - saltByte + 256) % 256;
      }
    }

    callback(null, chunk);
  }
}

/**
 * Utility wrapper to expose as library
 */
class CryptoStream {
  constructor(secretKey) {
    this.secretKey = Buffer.from(secretKey);
  }

  // Generate random salt
  static generateSalt(size = 16) {
    return crypto.randomBytes(size);
  }

  // Encrypt file
  async encryptFile(inputPath, outputPath, salt) {
    const readFileHandle = await fs.open(inputPath, "r");
    const writeFileHandle = await fs.open(outputPath, "w");

    const readStream = readFileHandle.createReadStream();
    const writeStream = writeFileHandle.createWriteStream();

    const encrypt = new Encrypt(this.secretKey, salt, "encrypt");
    readStream.pipe(encrypt).pipe(writeStream);

    return new Promise((resolve, reject) => {
      writeStream.on("finish", resolve);
      writeStream.on("error", reject);
    });
  }

  // Decrypt file
  async decryptFile(inputPath, outputPath, salt) {
    const readFileHandle = await fs.open(inputPath, "r");
    const writeFileHandle = await fs.open(outputPath, "w");

    const readStream = readFileHandle.createReadStream();
    const writeStream = writeFileHandle.createWriteStream();

    const decrypt = new Encrypt(this.secretKey, salt, "decrypt");
    readStream.pipe(decrypt).pipe(writeStream);

    return new Promise((resolve, reject) => {
      writeStream.on("finish", resolve);
      writeStream.on("error", reject);
    });
  }
}

// Example usage
(async () => {
  const secretKey = "mySuperSecretKey";
  const salt = CryptoStream.generateSalt();

  const cryptoStream = new CryptoStream(secretKey);

  await cryptoStream.encryptFile("read.txt", "write.enc", salt);
  console.log("File encrypted!");

  await cryptoStream.decryptFile("write.enc", "write.dec.txt", salt);
  console.log("File decrypted!");
})();
