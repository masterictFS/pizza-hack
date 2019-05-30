import {Component, OnInit} from '@angular/core';
import {Pizza} from '../models/pizza.model';
import {PizzaService} from '../services/pizza.service';
import {Topping} from '../models/topping.model';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-pizzas-list',
  templateUrl: './pizzas-list.component.html',
  styleUrls: ['./pizzas-list.component.css']
})
export class PizzasListComponent implements OnInit {
  originalPizzas: Pizza[];
  pizzas: Pizza[];
  toppings: Topping[];

  filter = new FormControl('');

  constructor(private pizzaService: PizzaService) {
    this.filter.valueChanges.subscribe(
      (response) => {
        this.pizzas = this.originalPizzas.filter(p => p.containsAll(response));
      },
      (error) => console.log(error)
    );
  }

  ngOnInit() {
    // TODO sort using new priority field
    this.pizzaService.getPizzas()
      .subscribe(
        (response) => {
          this.originalPizzas = response;
          this.pizzas = response;
        },
        (error) => console.log(error)
      );
  }

}
