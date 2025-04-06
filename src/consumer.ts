import amqp from "amqplib";
import readline from "readline";

const RABBITMQ_URL =
  "amqps://lqvkncly:48o3Ep9zxuNlcKdFAmXnNzZS6JeN4L2p@jackal.rmq.cloudamqp.com/lqvkncly";
const EXCHANGE_NAME = "streaming_topic";

const categoriasValidas = [
  "filme",
  "serie",
  "documentario",
  "reality",
  "anime.desenho",
];

async function startConsumer(categoria: string) {
  try {
    const connection = await amqp.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();

    await channel.assertExchange(EXCHANGE_NAME, "topic", { durable: false });

    const q = await channel.assertQueue("", { exclusive: true });

    await channel.bindQueue(q.queue, EXCHANGE_NAME, categoria);

    console.log(`\n[✔] Aguardando mensagens da categoria '${categoria}'`);
    channel.consume(
      q.queue,
      (msg) => {
        if (msg?.content) {
          const mensagem = msg.content.toString();
          console.log(`[📥] Mensagem recebida: ${mensagem}`);
        }
      },
      { noAck: true }
    );
  } catch (err) {
    console.error("[❌] Erro ao conectar:", err);
  }
}

// Leitura do terminal
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("Escolha uma categoria:");
categoriasValidas.forEach((cat, i) => console.log(` ${i + 1}) ${cat}`));

rl.question("Digite o número da categoria desejada: ", (res) => {
  const index = parseInt(res) - 1;
  const categoria = categoriasValidas[index];

  if (!categoria) {
    console.log("Categoria inválida.");
    process.exit(1);
  }

  rl.close();
  startConsumer(categoria);
});
