export class PizzaPrice {
  constructor(
    size: Size,
    price: number
  ) {}

  static createPriceObjs(pizzaPrices: PizzaPrice[]) {
    // return pizzaPrices.map(prices => new PizzaPrice(prices.size, prices.price));
  }
}

enum Size {
  S, M, L
}
