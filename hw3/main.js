import http from "http";
import fs from "fs/promises";

const port = 3000;
const file = "counter.txt";
const encoding = "utf-8";

const server = http.createServer(async (req, res) => {
  res.setHeader("Content-Type", "text/plain");

  try {
    const number = await readCounterFile();

    if (req.url === "/read") {
      res.statusCode = 200;
      res.end(`Current number: ${number}`);
      return;
    }

    if (req.url === "/increase") {
      res.statusCode = 200;
      await updateNumber(number, "increase");
      res.end("Increased number by 1");
      return;
    }

    if (req.url === "/decrease") {
      res.statusCode = 200;
      await updateNumber(number, "decrease");
      res.end("Decreased number by 1");
      return;
    }

    res.statusCode = 404;
    res.end("Not Found");
  } catch (error) {
    res.statusCode = 500;
    res.end(error.message);
  }
});

server.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

async function readCounterFile() {
  try {
    const data = await fs.readFile(file, encoding);
    return data;
  } catch {
    await fs.writeFile(file, "0", encoding);
    return "0";
  }
}

async function updateNumber(number, operation) {
  if (operation === "increase") {
    number++;
  } else if (operation === "decrease") {
    number--;
  }
  await fs.writeFile(file, number.toString(), encoding);
}
