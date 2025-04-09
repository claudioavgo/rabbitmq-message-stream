# Projeto com RabbitMQ

Este projeto demonstra um exemplo simples de envio e recepção de mensagens utilizando RabbitMQ. O projeto é composto por três componentes:

- **Consumidor (Consumer):** Se inscreve em uma categoria específica para receber mensagens.
- **Auditoria (Auditor):** Escuta todas as mensagens enviadas no sistema, permitindo acompanhar o fluxo completo.
- **Produtor (Producer):** Permite o envio de mensagens para uma categoria específica por meio de um programa em Java.

# Requisitos

- **Node.js:** Necessário para executar os scripts TypeScript (versão 10 ou superior).
- **TypeScript:** Caso queira compilar os arquivos manualmente (opcional, pois usaremos o ts-node).
- **ts-node:** Permite executar arquivos TypeScript diretamente, sem necessidade de pré-compilação.
- **Java:** Necessário para compilar e executar o produtor (recomenda-se o Java 8 ou superior).
- **RabbitMQ:** Neste projeto, utiliza-se o [CloudAMQP](https://www.cloudamqp.com/). A URL de conexão e o nome do *exchange* já estão configurados no código.

# Instalação

## Dependências para os Scripts TypeScript (Consumidor e Auditor)

1. Instale o [Node.js](https://nodejs.org/).
2. No diretório do projeto, instale as dependências necessárias:
   ```bash
   npm install amqplib readline ts-node typescript --save-dev
   ```
3. **amqplib e readline:** Utilizados pelos scripts em Node.js.
4. **ts-node e typescript:** Permitem a execução e compilação de arquivos .ts.

# Execução

## Consumidor (Consumer)

O arquivo consumer.ts é responsável por se inscrever em uma categoria específica e receber mensagens correspondentes.

- Como executar:
```bash
   ts-node src/consumer.ts
```
- Funcionamento:
- 1. O auditor se conecta ao mesmo exchange usado pelo consumidor.
- 2. O script exibe a chave de roteamento e o conteúdo de cada mensagem recebida, permitindo uma visualização global do fluxo de mensagens.

## Auditoria (Auditor)

O arquivo auditor.ts implementa o backend de auditoria, que escuta todas as mensagens publicadas na exchange. Este componente utiliza a routing key # (curinga), garantindo o recebimento de todas as mensagens sem filtragem.

- Como executar:
```bash
   ts-node src/auditor.ts
```

- Funcionamento:
- 1. Conecta-se à mesma exchange utilizada pelos demais componentes.
- 2. Cria uma fila temporária exclusiva com binding usando a routing key #.
- 3. Exibe no console a chave de roteamento e o conteúdo de cada mensagem, permitindo a visualização completa do fluxo.

## Produtor (Producer em Java)

O arquivo Producer.java permite o envio de mensagens para diferentes categorias. Durante a execução, o programa solicita:

- Seu nome (identificando o produtor).
- A escolha da categoria (ex.: Filme, Série, Documentário, Reality Show, Anime/Desenho).
- A mensagem a ser enviada.

Após a entrada dos dados, o produtor formata a mensagem (incluindo data/hora e o nome do produtor) e a envia para o RabbitMQ com a chave de roteamento correspondente à categoria selecionada.
