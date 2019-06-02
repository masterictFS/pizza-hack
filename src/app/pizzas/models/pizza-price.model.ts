export class PizzaPrice {
  constructor(
    public size: Size,
    public price: number
  ) {}

  static createPriceObjs(pizzaPrices: PizzaPrice[]) {
    return pizzaPrices.map(prices => new PizzaPrice(prices.size, prices.price)).sort(this.sizeComparator);
  }

  static sizeComparator(a: PizzaPrice, b: PizzaPrice): number {
    if (Size[a.size] < Size[b.size]) {
      return -1;
    } else if (Size[a.size] === Size[b.size]) {
      return 0;
    } else {
      return 1;
    }
  }
}

export enum Size {
  S,
  M,
  L
}
