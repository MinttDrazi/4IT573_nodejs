import fs from "fs";

const sourceFile = "instrukce.txt";

fs.readFile(sourceFile, (err, data) => {
  if (err) {
    console.error("Chyba při čtení souboru:", err);
    return;
  }

  try {
    const instruction = JSON.parse(data);

    fs.readFile(instruction.source, (err, data) => {
      if (err) {
        console.error("Chyba při čtení souboru:", err);
        return;
      } else {
        const fileContent = data.toString();
        fs.writeFile(instruction.target, fileContent, (err) => {
          if (err) {
            console.error("Chyba při zápisu do souboru:", err);
            return;
          }
        });
      }
    });
  } catch (e) {
    console.error("Chyba při parsování JSON:", e);
  }
});
