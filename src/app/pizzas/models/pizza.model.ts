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

  hasPriceForSize(size: string): boolean {
    // @ts-ignore
    return Boolean(this.prices.find(p => p.size === size));
  }

  // TODO maybe figure out how to do this properly without the nasty exception
  getPriceForSize(size: string): number {
    // @ts-ignore
    return this.prices.find(p => p.size === size).price;
  }

  getPricesString(): string[] {
    const pricesToBeSorted = this.prices.slice();
    pricesToBeSorted.sort((a, b) => PizzaPrice.sizeComparator(a, b));
    return pricesToBeSorted.map(p => p.size + ': ' + p.price);
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

  comparisonString(otherPizza: Pizza): string {
    const comparison = this.compareToOther(otherPizza);
    const extra = JSON.stringify(comparison.extra);
    const missing = JSON.stringify(comparison.missing);

    return 'A ' + this.name + ' pizza is a ' + otherPizza.name + ' with ' + extra + ' and without ' + missing;
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

  printToString(): string {
    return this.originalPizza.name
      + ' with extra ' + JSON.stringify(this.missing.map(t => t.name))
      + ' and without ' + JSON.stringify(this.extra.map(t => t.name));
  }
}
