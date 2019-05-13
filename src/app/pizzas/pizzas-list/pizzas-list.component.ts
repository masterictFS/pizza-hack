import {Component, OnInit} from '@angular/core';
import {Pizza} from '../models/pizza.model';
import {PizzaService} from '../services/pizza.service';

@Component({
  selector: 'app-pizzas-list',
  templateUrl: './pizzas-list.component.html',
  styleUrls: ['./pizzas-list.component.css']
})
export class PizzasListComponent implements OnInit {
  pizzas: Pizza[];

  constructor(private pizzaService: PizzaService) {}

  ngOnInit() {
    this.pizzaService.getPizzas()
      .subscribe(
        (response) => {
          this.pizzas = response;
        },
        (error) => console.log(error)
      );
  }

}
