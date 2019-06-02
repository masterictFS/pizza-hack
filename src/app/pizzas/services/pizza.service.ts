import {Injectable} from '@angular/core';
import {Pizza} from '../models/pizza.model';
import {ToppingsService} from './toppings.service';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {environment} from '../../../environments/environment';


@Injectable()
export class PizzaService {

  private pizzas: Pizza[];
  private userPizzas: Pizza[];

  constructor(private toppingService: ToppingsService, private http: HttpClient) {}

  // used to notify that user pizzas have been updated and have to be fetched again
  userPizzasUpdated = new Subject();

  getPizzas() {
    return this.http.get<Pizza[]>('pizzas')
      .pipe(map(
        (pizzas) => {
          const pizzaObjs = pizzas.map(pizza => Pizza.createPizzaObject(pizza));
          this.pizzas = pizzaObjs;
          return pizzaObjs;
        }
      ));
  }

  getUserPizzas(userId: number) {
    return this.http.get<Pizza[]>('user_pizzas/' + userId)
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
    return this.http.post('pizzas', {
      'name': pizza.name,
      'toppings_ids': pizza.toppings.map(t => t.id),
      'user_id': environment.defaultUserId
    });
  }
}
