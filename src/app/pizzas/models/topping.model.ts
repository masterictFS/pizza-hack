export class Topping {
  constructor(
    public id: number,
    public name: string
  ) {}

  static createToppingObjs(toppings: Topping[]) {
    return toppings.map(topping => new Topping(topping.id, topping.name));
  }
}
