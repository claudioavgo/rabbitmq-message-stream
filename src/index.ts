import mqConnection from "./rabbitmq";

const listen = async () => {
  await mqConnection.conectar();

  await mqConnection.consumir();
};

listen();

const funcao = () => {
  console.log("teste");
};

function funcao2() {
  console.log("teste");
}
