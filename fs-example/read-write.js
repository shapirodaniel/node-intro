const { create } = require("domain");
const fs = require("fs/promises");
const { data } = require("./read-write-data");

// https://nodejs.org/en/knowledge/advanced/buffers/how-to-use-buffers/#usage
const buf = Buffer.from(JSON.stringify(data));

const outputDirectoryName = "output";
const basePath = `${__dirname}/${outputDirectoryName}`;

async function createDirectory() {
  await fs.mkdir(basePath);
}

async function write() {
  await fs.writeFile(`${basePath}/untransformed-output.txt`, buf);
}

async function readAndTransform() {
  const data = await fs.readFile(`${basePath}/untransformed-output.txt`);
  const parsed = JSON.parse(data);
  const buf = Buffer.from(JSON.stringify(parsed.map(() => 0)));
  await fs.writeFile(`${basePath}/transformed-output.txt`, buf);
}

createDirectory();
write();
readAndTransform();
