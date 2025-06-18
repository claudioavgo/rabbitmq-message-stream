# 📡 RabbitMQ Message Stream

A modular messaging system that demonstrates how to use **RabbitMQ** for publishing and consuming categorized messages.  
Built with **Java** and **TypeScript**, this project includes:

- **Producer** (Java): Sends categorized messages to a RabbitMQ exchange.
- **Consumer** (TypeScript): Subscribes to a specific category (routing key) and receives relevant messages.
- **Auditor** (TypeScript): Listens to all messages across categories using a wildcard routing key for full system visibility.

---

## 📦 Project Structure

```

rabbitmq-message-stream/
├── src/
│   ├── consumer.ts    # Node.js consumer for specific categories
│   ├── auditor.ts     # Node.js auditor that listens to all messages
├── java/
│   └── Producer.java  # Java-based message producer
├── README.md
└── package.json

````

## ✅ Requirements

### System

- [Node.js](https://nodejs.org/) (v10+)
- [Java](https://www.oracle.com/java/technologies/javase-downloads.html) (Java 8+)
- [RabbitMQ](https://www.cloudamqp.com/) (using [CloudAMQP](https://www.cloudamqp.com/) as the broker)

### Node.js Dependencies

```bash
npm install amqplib readline ts-node typescript --save-dev
````

> `amqplib`: AMQP client library
> `readline`: Used for terminal input
> `ts-node` & `typescript`: For executing `.ts` scripts directly

---

## 🚀 How to Run

### 1. Consumer

Subscribes to a specific message category.

```bash
ts-node src/consumer.ts
```

* Connects to the same RabbitMQ exchange as the producer.
* Displays incoming messages for the selected routing key (e.g., `anime`, `movie`, etc.).

---

### 2. Auditor

Receives **all messages** from the exchange, regardless of category.

```bash
ts-node src/auditor.ts
```

* Binds a temporary queue to the exchange with routing key `#`.
* Useful for debugging, monitoring, and auditing the entire message stream.

---

### 3. Producer (Java)

Sends categorized messages to the exchange.

#### Steps:

1. Navigate to the `java/` folder.
2. Compile and run the producer:

```bash
javac Producer.java
java Producer
```

3. During execution, you will be prompted to:

* Enter your name
* Select a category (e.g., Movie, Series, Documentary, Reality Show, Anime/Cartoon)
* Enter your message

The message is formatted with your name and timestamp, then sent using a routing key based on the selected category.

---

## 🌐 Exchange Configuration

This project uses a pre-configured **direct exchange** on [CloudAMQP](https://www.cloudamqp.com/).
The connection URL and exchange name are already embedded in the code. To change the broker, update the following in each component:

* `amqp.connect(...)`: Update with your own AMQP URL.
* Exchange name (typically `"direct_logs"` or similar).

---

## 🛡️ Notes

* The auditor uses a wildcard routing key (`#`) to listen to every message routed through the exchange.
* For production-grade systems, consider using persistent queues and proper message acknowledgment.

---

## 👤 Author

**Cláudio Alves Gonçalves de Oliveira**
Email: [hi@claudioav.com](mailto:hi@claudioav.com)

---

## 📃 License

This project is licensed under the MIT License.
