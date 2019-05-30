import {Injectable} from '@angular/core';
import {Pizza} from '../models/pizza.model';
import {ToppingsService} from './toppings.service';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class PizzaService {

  constructor(private toppingService: ToppingsService, private http: HttpClient) {}

  private pizzas: Pizza[];
  private userPizzas: Pizza[];

  getPizzas() {
    return this.http.get<Pizza[]>('http://localhost:8080/pizzas')
      .pipe(map(
        (pizzas) => {
          const pizzaObjs = pizzas.map(pizza => Pizza.createPizzaObject(pizza));
          this.pizzas = pizzaObjs;
          return pizzaObjs;
        }
      ));
  }

  getUserPizzas(userId: number) {
    return this.http.get<Pizza[]>('http://localhost:8080/user_pizzas/' + userId)
      .pipe(map(
        (pizzas) => {
          const pizzaObjs = pizzas.map(pizza => Pizza.createPizzaObject(pizza));
          this.userPizzas = pizzaObjs;
          return pizzaObjs;
        }
      ));
  }

  getPizzaById(id: number): Pizza {
    let res: Pizza;
    if (this.pizzas) {
      res = this.pizzas.find(pizza => pizza.id === id);
      if (res) {
        return res = res.clone();
      }
    }
    if (this.userPizzas) {
      res = this.userPizzas.find(pizza => pizza.id === id);
      if (res) {
        return res.clone();
      }
    }
  }

  savePizza(pizza: Pizza) {
    return this.http.post('http://localhost:8080/pizzas', {
      'name': pizza.name,
      'toppings_ids': pizza.toppings.map(t => t.id),
      'user_id': 5
    });
  }
}
