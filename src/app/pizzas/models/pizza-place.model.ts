export class PizzaPlace {
  constructor (
    public id: number,
    public name: string,
    public stringTag: string
  ) {}

  static createPizzaPlaceObject(pizzaPlace: PizzaPlace) {
    return new PizzaPlace(pizzaPlace.id, pizzaPlace.name, pizzaPlace.stringTag);
  }
}
