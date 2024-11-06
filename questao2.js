import promptSync from "prompt-sync";
const prompt = promptSync({ sigint: true });
import Vertice from "./vertice.js";

class Triangulo {
  #vertice1;
  #vertice2;
  #vertice3;

  get vertice1() {
    return this.#vertice1;
  }
  get vertice2() {
    return this.#vertice2;
  }
  get vertice3() {
    return this.#vertice3;
  }

  constructor(vertice1, vertice2, vertice3) {
    if (
      vertice1.x * vertice2.y +
        vertice1.y * vertice3.x +
        vertice2.x * vertice3.y -
        (vertice2.y * vertice3.x +
          vertice3.y * vertice1.x +
          vertice1.y * vertice2.x) ===
      0
    )
      throw new Error("Os pontos inseridos nao formam um triangulo!");
    else {
      this.#vertice1 = vertice1;
      this.#vertice2 = vertice2;
      this.#vertice3 = vertice3;
    }
  }

  equals(outroTriangulo) {
    let map = new Map([
      [
        `${outroTriangulo.vertice1.x},${outroTriangulo.vertice1.y}`,
        outroTriangulo.vertice1,
      ],
      [
        `${outroTriangulo.vertice2.x},${outroTriangulo.vertice2.y}`,
        outroTriangulo.vertice2,
      ],
      [
        `${outroTriangulo.vertice3.x},${outroTriangulo.vertice3.y}`,
        outroTriangulo.vertice3,
      ],
    ]);

    return (
      map.has(`${this.#vertice1.x},${this.#vertice1.y}`) &&
      map.has(`${this.#vertice2.x},${this.#vertice2.y}`) &&
      map.has(`${this.#vertice3.x},${this.#vertice3.y}`)
    );
  }

  perimetro() {
    return (
      this.#vertice1.distancia(this.#vertice2) +
      this.#vertice2.distancia(this.#vertice3) +
      this.#vertice3.distancia(this.#vertice1)
    );
  }

  tipo() {
    let a = this.#vertice1.distancia(this.#vertice2);
    let b = this.#vertice2.distancia(this.#vertice3);
    let c = this.#vertice3.distancia(this.#vertice1);

    if (a === b && a === c) return "equilatero";
    else if (a !== b && a !== c && b !== c) return "escaleno";
    else return "isosceles";
  }

  clone() {
    let clone = new Triangulo(
      new Vertice(this.#vertice1.x, this.#vertice1.y),
      new Vertice(this.#vertice2.x, this.#vertice2.y),
      new Vertice(this.#vertice3.x, this.#vertice3.y)
    );
    return clone;
  }

  area() {
    let a = this.#vertice1.distancia(this.#vertice2);
    let b = this.#vertice2.distancia(this.#vertice3);
    let c = this.#vertice3.distancia(this.#vertice1);
    let S = this.perimetro() / 2;

    return Math.sqrt(S * (S - a) * (S - b) * (S - c));
  }
}

const triangulos = [];
let i = 1;
while (1) {
  console.log(`triangulo${i}`);
  try {
    triangulos[i - 1] = new Triangulo(
      new Vertice(
        Number(prompt(`vertice1 x: `)),
        Number(prompt(`vertice1 y: `))
      ),
      new Vertice(
        Number(prompt(`vertice2 x: `)),
        Number(prompt(`vertice2 y: `))
      ),
      new Vertice(
        Number(prompt(`vertice3 x: `)),
        Number(prompt(`vertice3 y: `))
      )
    );
    i++;
  } catch (err) {
    console.log(err.message);
  }
  if (triangulos.length === 3) break;
}

triangulos.forEach((triangulo) => {
  console.log("#");
  console.log(`triangulo${triangulos.indexOf(triangulo) + 1}`);
  for (let i = 0; i < 3; i++) {
    if (triangulos.indexOf(triangulo) !== i)
      if (triangulo.equals(triangulos[i]))
        console.log(`equals triangulo${i + 1}`);
      else console.log(`does not equal triangulo${i + 1}`);
  }
  console.log(`perimetro: ${triangulo.perimetro()}`);
  console.log(`tipo: ${triangulo.tipo()}`);
  triangulos.push(triangulo.clone());
  console.log(
    `clone${triangulos.indexOf(triangulo) + 1}: ${
      triangulos[triangulos.length - 1].vertice1.x
    }-${triangulos[triangulos.length - 1].vertice1.y} ${
      triangulos[triangulos.length - 1].vertice2.x
    }-${triangulos[triangulos.length - 1].vertice2.y} ${
      triangulos[triangulos.length - 1].vertice3.x
    }-${triangulos[triangulos.length - 1].vertice3.y}`
  );
  console.log(`area: ${triangulo.area()}`);
});
