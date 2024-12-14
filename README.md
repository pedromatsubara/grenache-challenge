# Order Matching Management Application

This application is a peer-to-peer (P2P) order matching system built using [Grenache](https://github.com/bitfinexcom/grenache), a distributed microservice framework. It simulates an order book that handles buy and sell orders, matches them, and processes transactions across a decentralized network of peers.


## Features
- Distributed P2P order matching using Grenache.
- Efficiently matches buy and sell orders with overlapping prices and quantities.
- Supports partial matching and maintains an order book for unmatched orders.
- Utilizes Grenache's `PeerRPCClient` and `PeerRPCServer` for client-server communication.


## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher).


## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/pedromatsubara/grenache-challenge.git
   ```

2. Navigate to the project directory:
   ```bash
   cd grenache-challenge
   ```

3. Install dependencies:
   ```bash
   npm install
   ```


## Starting the Application

1. Start the server:
   ```bash
   npm run server
   ```

2. Start multiple clients in separate terminals:
   ```bash
   npm run client
   ```


## Example Usage

- The server will log incoming orders and matched results.
- Clients will send random buy/sell orders and display the matches.

Example server log:
```bash
Order Created:  { type: 'sell', price: 7, quantity: 7 }
Received order: { type: 'sell', price: 7, quantity: 7 }
Matches: []

Order Created:  { type: 'buy', price: 7, quantity: 1 }
Received order: { type: 'buy', price: 7, quantity: 0 }
Matches: [
  {
    buyOrder: { type: 'buy', price: 7, quantity: 0 },
    sellOrder: { type: 'sell', price: 7, quantity: 6 },
    quantity: 1,
    price: 7
  }
]
```


## Further Improvements

1. **Rollback Management**:
   - Implement robust handling of failed requests caused by potential unsynchronized clients.

2. **Advanced Matching Logic**:
   - Enhance `OrderBook.js` to include additional matching criteria, such as prioritization by timestamp or user-defined rules.

3. **Enhanced Logging**:
   - Add structured and persistent logs for better monitoring, debugging, and analytics.

4. **Grape Port Management**:
   - Improve handling of disconnected peers by removing dead ports from Grape nodes when clients shut down.

5. **Add Jest Tests**:
   - Ensure system reliability by setting up unit and integration tests using the [Jest](https://jestjs.io/) framework.
