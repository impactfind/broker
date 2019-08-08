const QBroker = require('qgrail-broker');
console.log(QBroker)
const Broker = QBroker.Broker;

const broker = new Broker({
  bind_address: "tcp://127.0.0.1:15000",
  services: [
    {
      name: "authentication",
      upstream: [
        "tcp://127.0.0.1:11000",
      ]
    },

  ],
  log: (type, data) => {
    console.log("TYPE: ", type);
    console.log("REQ: ", data);
  }
});

process.on("SIGINT", () => {
  console.log("BROKER TERMINATED");
  broker.close();
});


broker.listen(() => {
  console.log("Broker listen at port 15000");
});
