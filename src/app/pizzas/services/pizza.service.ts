import {Injectable} from '@angular/core';
import {Pizza} from '../models/pizza.model';
import {ToppingService} from './topping.service';
import {Response} from '@angular/http';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class PizzaService {

  constructor(private toppingService: ToppingService, private http: HttpClient) { }

  /*private pizzas: Pizza[] = [
    new Pizza(1, 'Margherita', [
      this.toppingService.getToppingByName('Pomodoro'),
      this.toppingService.getToppingByName('Mozzarella')
    ], []),
    new Pizza(2, 'Napoli', [
      this.toppingService.getToppingByName('Pomodoro'),
      this.toppingService.getToppingByName('Mozzarella'),
      this.toppingService.getToppingByName('Acciughe')
    ], []),
    new Pizza(3, 'Prosciutto', [
      this.toppingService.getToppingByName('Pomodoro'),
      this.toppingService.getToppingByName('Mozzarella'),
      this.toppingService.getToppingByName('Prosciutto')
    ], [])
  ];*/

  private pizzas: Pizza[];

  getPizzas() {
    return this.http.get<Pizza[]>('http://localhost:8080/pizzas')
      .pipe(map(
        (pizzas) => {
          const pizzaObjs = pizzas.map(pizza => Pizza.createPizzaObject(pizza))
          this.pizzas = pizzaObjs;
          return pizzaObjs;
        }
      ));
  }

  getPizzaById(id: number): Pizza {
    if (this.pizzas) {
      return this.pizzas.filter(pizza => pizza.id === id)[0].clone();
    }
  }
}
