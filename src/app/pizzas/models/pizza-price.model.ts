export class PizzaPrice {
  constructor(
    public size: Size,
    public price: number
  ) {}

  static createPriceObjs(pizzaPrices: PizzaPrice[]) {
    return pizzaPrices.map(prices => new PizzaPrice(prices.size, prices.price));
  }
}

enum Size {
  S, M, L
}
