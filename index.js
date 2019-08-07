const QBroker = require('qgrail-broker');
console.log(QBroker)
const Broker = QBroker.Broker;

const broker = new Broker({
  bind_address: "tcp://127.0.0.1:15001",
  services: [
    {
      name: "notification",
      upstream: [
        "tcp://127.0.0.1:10312",
      ]
    },
    {
      name: "transaction",
      upstream: [
        "tcp://127.0.0.1:11004",
      ]
    },
    {
      name: "profiles",
      upstream: [
        "tcp://127.0.0.1:11001",
      ]
    },
    {
      name: "authentication",
      upstream: [
        "tcp://127.0.0.1:11000",
      ]
    },
    {
      name: "settings",
      upstream: [
        "tcp://0.0.0.0:11003",
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
