import {Injectable} from '@angular/core';
import {Topping} from '../models/topping.model';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ToppingsService {

  constructor(private http: HttpClient) {}

  getToppings() {
    return this.http.get<Topping[]>('toppings')
      .pipe(map(
        (toppings) => {
          console.log('calling server for allToppingsList lol');
          return toppings.map(topping => Topping.createToppingObj(topping));
        }
      ));
  }
}
