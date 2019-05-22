import {Component, OnInit} from '@angular/core';
import {Pizza} from '../models/pizza.model';
import {PizzaService} from '../services/pizza.service';
import {Topping} from '../models/topping.model';

@Component({
  selector: 'app-pizzas-list',
  templateUrl: './pizzas-list.component.html',
  styleUrls: ['./pizzas-list.component.css']
})
export class PizzasListComponent implements OnInit {
  pizzas: Pizza[];
  toppings: Topping[];

  constructor(private pizzaService: PizzaService) {}

  ngOnInit() {
    // TODO sort using new priority field
    this.pizzaService.getPizzas()
      .subscribe(
        (response) => this.pizzas = response,
        (error) => console.log(error)
      );
  }

}
