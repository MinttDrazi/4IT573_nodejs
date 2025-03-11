import fs from "fs/promises";

async function main() {
  try {
    const data = await fs.readFile("instrukce.txt", "utf-8");
    const number = parseInt(data.trim(), 10);

    const newFiles = [];
    for (let i = 0; i <= number; i++) {
      newFiles.push(fs.writeFile(`${i}.txt`, `Soubor ${i}`, "utf8"));
    }
    await Promise.all(newFiles);

    console.log(`Vytvořeno ${number + 1} souborů.`);
  } catch (error) {
    console.error(error);
  }
}

main();
