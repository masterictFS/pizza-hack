import {Component, OnInit} from '@angular/core';
import {PizzaService} from './services/pizza.service';
import {Pizza} from './models/pizza.model';

@Component({
  selector: 'app-pizzas',
  templateUrl: './pizzas.component.html',
  styleUrls: ['./pizzas.component.css']
})
export class PizzasComponent implements OnInit {

  originalPizzas: Pizza[];
  pizzas: Pizza[];

  originalUserPizzas: Pizza[];
  userPizzas: Pizza[];

  constructor(private pizzaService: PizzaService) { }

  ngOnInit() {
    // TODO sort using new priority field
    this.pizzaService.getPizzas()
      .subscribe(
        (response) => {
          response = response.sort(Pizza.comparePizzasByName);
          this.pizzas = response;
          this.originalPizzas = response;
        },
        (error) => console.log(error)
      );

    this.pizzaService.getUserPizzas(5)
      .subscribe(
        (response) => {
          response = response.sort((a, b) => a.name < b.name ? -1 : +(a.name > b.name));
          this.userPizzas = response;
          this.originalUserPizzas = response;
        },
        (error) => console.log(error)
      );
  }

}
