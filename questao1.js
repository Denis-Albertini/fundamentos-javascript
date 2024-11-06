import promptSync from "prompt-sync";
const prompt = promptSync({ sigint: true });
import Vertice from "./vertice.js";

console.log("vertice1");
const vertice1 = new Vertice(Number(prompt(`x: `)), Number(prompt(`y: `)));
console.log("vertice2");
const vertice2 = new Vertice(Number(prompt(`x: `)), Number(prompt(`y: `)));
console.log("vertice3");
const vertice3 = new Vertice(Number(prompt(`x: `)), Number(prompt(`y: `)));

console.log(
  `distancia entre vertice1 e vertice2: ${vertice1.distancia(vertice2)}`
);
if (vertice3.equals(vertice1)) console.log("vertice3 equals vertice1");
else console.log("vertice3 does not equal vertice1");
vertice3.move(vertice1.x, vertice1.y);
if (vertice3.equals(vertice1)) console.log("vertice3 equals vertice1");
else console.log("vertice3 does not equal vertice1");
