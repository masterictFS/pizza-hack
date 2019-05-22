export class Topping {
  constructor(
    public id: number,
    public name: string
    // TODO add a priority field to influence sorting: sort first by priority, then alphabetically
  ) {}

  static createToppingObjsFromArray(toppings: Topping[]) {
    return toppings.map(topping => Topping.createToppingObj(topping));
  }

  static createToppingObj(topping: Topping): Topping {
    return new Topping(topping.id, topping.name);
  }
}
