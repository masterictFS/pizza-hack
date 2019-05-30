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

  static comparePizzasByName(a: Pizza, b: Pizza): number {
    return a.name < b.name ? -1 : +(a.name > b.name);
  }

  hasPriceForSize(size: string): boolean {
    // @ts-ignore
    return Boolean(this.prices.find(p => p.size === size));
  }

  // TODO maybe figure out how to do this properly without the nasty exception
  getPriceForSize(size: string): number {
    // @ts-ignore
    return this.prices.find(p => p.size === size).price;
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

  missingToppingsFromOther(otherPizza: Pizza): Topping[] {
    return otherPizza.toppings.filter(topping => !this.toppings.find((t) => t.id === topping.id));
  }

  extraToppingToOther(otherPizza: Pizza): Topping[] {
    return otherPizza.missingToppingsFromOther(this);
  }

  compareToOther(otherPizza: Pizza): PizzaCompareResult {
    return new PizzaCompareResult(
      this,
      otherPizza,
      this.missingToppingsFromOther(otherPizza),
      this.extraToppingToOther(otherPizza)
    );
  }

  containsAll(search: string): boolean {
    search = search.toLowerCase();
    return this.name.toLowerCase().includes(search)
      || this.toppings.findIndex(t => t.name.toLowerCase().includes(search)) >= 0;
  }
}

export class PizzaCompareResult {
  originalPizza: Pizza;
  comparedPizza: Pizza;
  missing: Topping[];
  extra: Topping[];
  newPrice = 0;

  constructor(originalPizza: Pizza, comparedPizza: Pizza, missing: Topping[], extra: Topping[]) {
    this.originalPizza = originalPizza;
    this.comparedPizza = comparedPizza;
    this.missing = missing;
    this.extra = extra;
  }

  static cheapestLeastAdditions(a: PizzaCompareResult, b: PizzaCompareResult) {
    if (a.newPrice !== b.newPrice) {
      return a.newPrice - b.newPrice;
    } else if (a.missing.length !== b.missing.length) {
      return a.missing.length - b.missing.length;
    }
    return a.extra.length - b.extra.length;
  }
}
