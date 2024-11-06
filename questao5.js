import promptSync from "prompt-sync";
const prompt = promptSync({ sigint: true });
import { DateTime } from "luxon";

class Cliente {
  #nome;
  #cpf;
  #dataNascimento;
  #renda;
  #estadoCivil;
  #dependentes;

  get nome() {
    return this.#nome;
  }
  get cpf() {
    return this.#cpf;
  }
  get dataNascimento() {
    return this.#dataNascimento;
  }
  get renda() {
    return this.#renda;
  }
  get estadoCivil() {
    return this.#estadoCivil;
  }
  get dependentes() {
    return this.#dependentes;
  }

  constructor(nome, cpf, dataNascimento, renda, estadoCivil, dependentes) {
    this.#nome = nome;
    this.#cpf = cpf;
    this.#dataNascimento = dataNascimento;
    this.#renda = renda;
    this.#estadoCivil = estadoCivil;
    this.#dependentes = dependentes;
  }
}

var input = "";
var padraoNome = /^[a-zA-Z ]{5,}$/;
while (!padraoNome.test(input)) {
  console.log("#");
  input = prompt("Nome: ");
  if (!padraoNome.test(input))
    console.log("Nome deve ter pelo menos 5 caracteres!");
}
let nome = input;

input = "";
var padraoCpf = /^\d{11}$/;
while (!padraoCpf.test(input)) {
  console.log("#");
  input = prompt("CPF: ");
  if (!padraoCpf.test(input)) console.log("CPF deve ter 11 digitos!");
}
let cpf = Number(input);

input = "";
var padraoData = /^\d{2}\/\d{2}\/\d{4}$/;
var dataLuxon;
while (1) {
  while (!padraoData.test(input)) {
    console.log("#");
    input = prompt("Data de nascimento: ");
    if (!padraoData.test(input))
      console.log("Data deve estar no formato dd/mm/aaaa!");
  }
  dataLuxon = DateTime.fromFormat(input, "dd/MM/yyyy");
  if (DateTime.now().diff(dataLuxon, "years").years >= 18) break;
  else {
    console.log("Idade precisa ser maior ou igual a 18!");
    input = "";
  }
}
let dataNascimento = dataLuxon;

input = "";
var padraoRenda = /\d,\d{2}/;
while (!padraoRenda.test(input) || Number(input) < 0) {
  console.log("#");
  input = prompt("Renda: ");
  if (!padraoRenda.test(input))
    console.log(
      "Renda deve ter a virgula decimal seguida de duas casas decimais!"
    );
  if (Number(input) < 0) console.log("Renda deve ser maior ou igual a 0!");
}
let renda = Number(input.replace(",", "."));

input = "";
var padraCivil = /[csvd]/i;
while (!padraCivil.test(input)) {
  console.log("#");
  input = prompt("Estado civil: ");
  if (!padraCivil.test(input))
    console.log("Estado civil pode ser C, S, V ou D!");
}
let estadoCivil = input.toUpperCase();

input = "";
var padraoDependentes = /^([0-9]|10)$/;
while (!padraoDependentes.test(input)) {
  console.log("#");
  input = prompt("Dependentes: ");
  if (!padraoDependentes.test(input))
    console.log("Dependentes deve ser um numero de 0 a 10!");
}
let dependentes = Number(input);

const cliente = new Cliente(
  nome,
  cpf,
  dataNascimento,
  renda,
  estadoCivil,
  dependentes
);

console.log("#");
console.log(`Nome: ${cliente.nome}`);
let cpfString = cliente.cpf.toString();
console.log(
  `CPF: ${
    cpfString.slice(0, 3) +
    "." +
    cpfString.slice(3, 6) +
    "." +
    cpfString.slice(6, 9) +
    "-" +
    cpfString.slice(9, 11)
  }`
);
console.log(
  `Data de nascimento: ${DateTime.fromISO(cliente.dataNascimento).toFormat(
    "dd/MM/yyyy"
  )}`
);
console.log(
  `Renda mensal: ${cliente.renda.toFixed(2).toString().replace(".", ",")}`
);
console.log(`Estado civil: ${cliente.estadoCivil}`);
console.log(`Dependentes: ${cliente.dependentes}`);
