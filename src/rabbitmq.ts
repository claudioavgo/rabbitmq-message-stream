import client from "amqplib";
import dotenv from "dotenv";

dotenv.config();

const NOTIFICATION_QUEUE = "notifications";

class RabbitMQControlador {
  connection: any;
  channel: any;
  private connected: Boolean = false;

  async conectar() {
    if (this.connected && this.channel) return;

    try {
      console.log(`⌛️ Conectando ao Rabbit-MQ Server`);

      this.connection = await client.connect(
        `amqps://lqvkncly:48o3Ep9zxuNlcKdFAmXnNzZS6JeN4L2p@jackal.rmq.cloudamqp.com/lqvkncly`
      );

      console.log(`✅ Conexão com o Rabbit-MQ Server estabelecida`);

      this.channel = await this.connection.createChannel();

      console.log(`🛸 Canal RabbitMQ criado com sucesso`);

      this.connected = true;
    } catch (error) {
      console.error(error);
      console.error(`Não foi possível conectar ao servidor Rabbit-MQ`);
    }
  }

  async consumir() {
    await this.channel.assertQueue(NOTIFICATION_QUEUE, {
      durable: true,
    });

    this.channel.consume(
      NOTIFICATION_QUEUE,
      (msg: any) => {
        if (!msg) {
          return console.error(`Mensagem inválida recebida`);
        }

        console.log(msg.content.toString());

        this.channel.ack(msg);
      },
      {
        noAck: false,
      }
    );
  }
}

const mqConnection = new RabbitMQControlador();

export default mqConnection;
