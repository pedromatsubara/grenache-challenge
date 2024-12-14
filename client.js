const { PeerRPCServer, PeerRPCClient } = require("grenache-nodejs-http");
const Link = require("grenache-nodejs-link");
const OrderBook = require("./OrderBook");

const link = new Link({
  grape: "http://127.0.0.1:30001",
});
link.start();

const peer = new PeerRPCServer(link, {
  timeout: 300000,
});
peer.init();

const client = new PeerRPCClient(link, {});
client.init();

const port = 1024 + Math.floor(Math.random() * 1000);
const service = peer.transport("server");
service.listen(port);

const announceInterval = setInterval(() => {
  link.announce("orderbook", service.port, (err) => {
    if (err) {
      console.error("Error announcing service:", err);
    }
  });
}, 1000);
console.log(`Service announced on port ${service.port}`);

const orderBook = new OrderBook();

service.on("request", (rid, key, payload, handler) => {
  const order = JSON.parse(payload);
  const matches = orderBook.addOrder(order);

  console.log(`Received order:`, order);

  handler.reply(null, JSON.stringify(matches));
});

setInterval(() => {
  const order = {
    type: Math.random() > 0.5 ? "buy" : "sell",
    price: Math.ceil(Math.random() * 9),
    quantity: Math.ceil(Math.random() * 9),
  };

  console.log(order);

  client.request(
    "orderbook",
    JSON.stringify(order),
    { timeout: 10000 },
    (err, res) => {
      if (err) {
        console.error("Error submitting order:", err.message);
      } else {
        console.log("Order matches received:", JSON.parse(res));
      }
    }
  );
}, 5000);

function cleanup() {
  console.log("Shutting instance down...");

  clearInterval(announceInterval);
  link.stop();
  process.exit(0);
}

process.on("SIGINT", cleanup);
process.on("SIGTERM", cleanup);
