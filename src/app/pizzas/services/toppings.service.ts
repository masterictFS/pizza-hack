import {Injectable} from '@angular/core';
import {Topping} from '../models/topping.model';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ToppingsService {

  constructor(private http: HttpClient) {}

  /*allToppingsList: Topping[] = [
    new Topping(1, 'Pomodoro'),
    new Topping(2, 'Mozzarella'),
    new Topping(3, 'Acciughe'),
    new Topping(4, 'Prosciutto')
  ];*/

  getToppings() {
    return this.http.get<Topping[]>('http://localhost:8080/toppings')
      .pipe(map(
        (toppings) => {
          console.log('calling server for allToppingsList lol');
          return toppings.map(topping => Topping.createToppingObj(topping));
        }
      ));
  }
}
