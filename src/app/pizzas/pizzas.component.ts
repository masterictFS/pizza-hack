import {Component, Input, OnInit} from '@angular/core';
import {PizzaService} from './services/pizza.service';
import {Pizza} from './models/pizza.model';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-pizzas',
  templateUrl: './pizzas.component.html',
  styleUrls: ['./pizzas.component.css']
})
export class PizzasComponent implements OnInit {

  @Input()
  pizzaPlaceTag: string;

  originalPizzas: Pizza[];
  pizzas: Pizza[];

  originalUserPizzas: Pizza[];
  userPizzas: Pizza[];

  constructor(private pizzaService: PizzaService) { }

  ngOnInit() {
    // TODO sort using new priority field
    this.pizzaService.getPizzas(this.pizzaPlaceTag)
      .subscribe(
        (response) => {
          response = response.sort(Pizza.comparePizzasByName);
          this.pizzas = response;
          this.originalPizzas = response;
        },
        (error) => console.log(error)
      );

    this.pizzaService.getUserPizzas(this.pizzaPlaceTag, environment.defaultUserId)
      .subscribe(
        (response) => {
          response = response.sort(Pizza.comparePizzasByName);
          this.userPizzas = response;
          this.originalUserPizzas = response;
        },
        (error) => console.log(error)
      );

    // the subject just subscribes to the service again to get user pizzas
    this.pizzaService.userPizzasUpdated.subscribe(() => {
      this.pizzaService.getUserPizzas(this.pizzaPlaceTag, environment.defaultUserId)
        .subscribe(
          (response) => {
            response = response.sort(Pizza.comparePizzasByName);
            this.userPizzas = response;
            this.originalUserPizzas = response;
          },
          (error) => console.log(error)
        );
    });
  }
}
