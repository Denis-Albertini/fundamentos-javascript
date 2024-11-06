export default class Vertice {
  #x;
  #y;

  constructor(x, y) {
    this.#x = x;
    this.#y = y;
  }

  get x() {
    return this.#x;
  }
  get y() {
    return this.#y;
  }

  distancia(outroVertice) {
    return Math.sqrt(
      Math.pow(outroVertice.x - this.#x, 2) +
        Math.pow(outroVertice.y - this.#y, 2)
    );
  }

  move(z, w) {
    this.#x = z;
    this.#y = w;
  }

  equals(outroVertice) {
    return this.#x === outroVertice.x && this.#y === outroVertice.y;
  }
}
