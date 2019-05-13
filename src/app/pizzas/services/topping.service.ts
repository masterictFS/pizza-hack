import { Injectable } from '@angular/core';
import {Topping} from '../models/topping.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ToppingService {

  constructor(private http: HttpClient) {}

  /*toppings: Topping[] = [
    new Topping(1, 'Pomodoro'),
    new Topping(2, 'Mozzarella'),
    new Topping(3, 'Acciughe'),
    new Topping(4, 'Prosciutto')
  ];*/

  getToppings() {
    return this.http.get<Topping[]>('http://localhost:8080/toppings');
  }
}
