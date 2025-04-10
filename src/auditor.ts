import amqp from "amqplib";

const RABBITMQ_URL =
  "amqps://lqvkncly:48o3Ep9zxuNlcKdFAmXnNzZS6JeN4L2p@jackal.rmq.cloudamqp.com/lqvkncly";
const EXCHANGE_NAME = "streaming_topic_2";

async function startAuditor() {
  try {
    const connection = await amqp.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();

    await channel.assertExchange(EXCHANGE_NAME, "topic", { durable: true });

    const queueName = "fila_auditoria";
    const q = await channel.assertQueue(queueName, { durable: true });

    await channel.bindQueue(q.queue, EXCHANGE_NAME, "#");

    console.log("[📋 AUDITORIA] Aguardando todas as mensagens...\n");

    channel.consume(q.queue, (msg) => {
      if (msg?.content) {
        const routingKey = msg.fields.routingKey;
        const mensagem = msg.content.toString();
        console.log(`[AUDITORIA] (${routingKey}) → ${mensagem}`);
        channel.ack(msg);
      }
    });
  } catch (err) {
    console.error("[❌] Erro ao conectar auditoria:", err);
  }
}

startAuditor();
