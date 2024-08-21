//Leer json en ESmodule
// import fs from "node:fs";
// const movies = JSON.parse(fs.readFileSync("./movies.json", "utf-8"));

//Leer json en ESmodule recomendado
// import { createRequire } from "node:module";
// const require = createRequire(import.meta.url);
//const movies = require('./movies.json)

//  functino recomendado
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);

export const readJSON = (path) => {
  return require(path);
};
