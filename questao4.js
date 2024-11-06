import promptSync from "prompt-sync";
const prompt = promptSync({ sigint: true });

class Aluno {
  #matricula;
  #nome;
  #p1;
  #p2;

  get matricula() {
    return this.#matricula;
  }
  get nome() {
    return this.#nome;
  }
  get p1() {
    return this.#p1;
  }
  get p2() {
    return this.#p2;
  }
  set p1(nota) {
    this.#p1 = nota;
  }
  set p2(nota) {
    this.#p2 = nota;
  }

  constructor(matricula, nome) {
    this.#matricula = matricula;
    this.#nome = nome;
  }
}

class Turma {
  #alunos;

  constructor() {
    this.#alunos = new Map();
  }

  addAluno(aluno) {
    if (!this.#alunos.has(aluno.matricula)) {
      this.#alunos.set(aluno.matricula, aluno);
      return true;
    } else return false;
  }

  dropAluno(matricula) {
    if (this.#alunos.has(matricula)) {
      this.#alunos.delete(matricula);
      return true;
    } else return false;
  }

  lancarNota(matricula, prova, nota) {
    if (this.#alunos.has(matricula)) {
      if (prova === 1) {
        this.#alunos.get(matricula).p1 = nota;
        return true;
      } else if (prova === 2) {
        this.#alunos.get(matricula).p2 = nota;
        return true;
      }
    } else return false;
  }

  gerarRelatorio() {
    let ordenados = Array.from(this.#alunos);
    ordenados.sort((a, b) => {
      if (a[1].nome < b[1].nome) return -1;
      if (a[1].nome > b[1].nome) return 1;
      return 0;
    });
    console.log("----------------------------------------");
    console.log("Matricula Nome              P1   P2   NF");
    console.log("----------------------------------------");
    ordenados.forEach((ordenado) => {
      let p1 = ordenado[1].p1 || 0;
      let p2 = ordenado[1].p2 || 0;
      console.log(
        `  ${ordenado[0]}   ${ordenado[1].nome.padEnd(14, " ")}   ${
          p1 !== 0 ? p1.toFixed(1) : "  -"
        }  ${p2 !== 0 ? p2.toFixed(1) : "  -"}  ${((p1 + p2) / 2).toFixed(1)}  `
      );
    });
    console.log("----------------------------------------");
  }
}

const turma = new Turma();

while (1) {
  console.log("#");
  console.log("Menu");
  console.log("(1)Adiconar aluno");
  console.log("(2)Remover aluno");
  console.log("(3)Lancar nota");
  console.log("(4)Gerar relatorio");
  console.log("(0)Encerrar programa");
  let input = Number(prompt("opcao: "));
  switch (input) {
    case 1:
      console.log("#");
      let aluno = new Aluno(prompt("Matricula: "), prompt("Nome: "));
      if (turma.addAluno(aluno)) break;
      console.log("Aluno ja registrado!");
      break;
    case 2:
      console.log("#");
      if (turma.dropAluno(prompt("Matricula: "))) break;
      console.log("Aluno nao existe!");
      break;
    case 3:
      console.log("#");
      let matricula = prompt("Matricula: ");
      let opcao = Number(prompt("(1)p1 ou (2)p2? "));
      let nota = Number(prompt("Nota: "));
      if (turma.lancarNota(matricula, opcao, nota)) break;
      console.log("Erro!");
      break;
    case 4:
      turma.gerarRelatorio();
      break;
    case 0:
      process.exit();
    default:
      process.exit();
  }
}
