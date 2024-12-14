class OrderBook {
  constructor() {
    this.orders = [];
  }

  addOrder(order) {
    const matches = this.matchOrder(order);

    if (matches.length === 0 || order.quantity > 0) {
      this.orders.push(order);
    }

    return matches;
  }

  matchOrder(order) {
    const matches = [];

    for (let i = this.orders.length - 1; i >= 0; i--) {
      const existingOrder = this.orders[i];

      if (
        existingOrder.type !== order.type &&
        existingOrder.price === order.price
      ) {
        const matchQuantity = Math.min(order.quantity, existingOrder.quantity);

        matches.push({
          buyOrder: order.type === "buy" ? order : existingOrder,
          sellOrder: order.type === "sell" ? order : existingOrder,
          quantity: matchQuantity,
          price: existingOrder.price,
        });

        order.quantity -= matchQuantity;
        existingOrder.quantity -= matchQuantity;

        if (existingOrder.quantity === 0) {
          this.orders.splice(i, 1);
        }

        if (order.quantity === 0) {
          break;
        }
      }
    }

    return matches;
  }
}

module.exports = OrderBook;
