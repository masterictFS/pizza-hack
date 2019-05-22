import {Topping} from './topping.model';
import {PizzaPrice} from './pizza-price.model';

export class Pizza {
  constructor(
    public id: number,
    public name: string,
    public toppings: Topping[],
    public prices: PizzaPrice[]
    // TODO add a priority field to influence sorting: sort first by priority, then alphabetically
  ) {}

  static createPizzaObject(pizza: Pizza) {
    return new Pizza(pizza.id, pizza.name, Topping.createToppingObjsFromArray(pizza.toppings), PizzaPrice.createPriceObjs(pizza.prices));
  }

  getToppingsNames(): string[] {
    return this.toppings.map(t => t.name);
  }

  addTopping(topping: Topping): number {
    return !this.toppings.find((t) => t.id === topping.id)
      ? this.toppings.push(topping)
      : -1;
  }

  clone() {
    return new Pizza(-1, this.name, this.toppings.slice(), this.prices.slice());
  }

  removeToppingById(id: number) {
    const i = this.toppings.findIndex(topping => topping.id === id);
    this.toppings.splice(i, 1);
  }
}
