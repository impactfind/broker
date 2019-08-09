const QBroker = require('qgrail-broker');
const Broker = QBroker.Broker;

const broker = new Broker({
  // bind_address: "tcp://127.0.0.1:15000",
  bind_address: "tcp://0.0.0.0:15000",
  services: [
    {
      name: "authentication",
      upstream: [
        "tcp://0.0.0.0:11000",
      ]
    },
    {
      name: "authentication2",
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
