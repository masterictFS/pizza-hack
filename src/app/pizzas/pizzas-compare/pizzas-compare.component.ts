import {Component, OnInit, ViewChild} from '@angular/core';
import {Pizza} from '../models/pizza.model';
import {PizzaService} from '../services/pizza.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Params} from '@angular/router';
import {Topping} from '../models/topping.model';
import {ToppingsService} from '../services/toppings.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-pizzas-compare',
  templateUrl: './pizzas-compare.component.html',
  styleUrls: ['./pizzas-compare.component.css']
})
export class PizzasCompareComponent implements OnInit {
  pizzaToBeCompared: Pizza;
  allToppingsList: Topping[] = [];
  paramsSubscription: Subscription;

  @ViewChild('form') ingredientForm: NgForm;

  constructor(private pizzaService: PizzaService, private toppingsService: ToppingsService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.paramsSubscription = this.route.params.subscribe(
      (params: Params) => {
        this.pizzaToBeCompared = this.pizzaService.getPizzaById(+params['id']);
        this.pizzaToBeCompared.name = 'My new ' + this.pizzaToBeCompared.name;
      }
    );

    // TODO sort using new priority field
    this.toppingsService.getToppings()
      .subscribe(
        (response) => this.allToppingsList = response,
        (error) => console.log(error)
      );
  }

  removeToppingById(id: number) {
    this.pizzaToBeCompared.removeToppingById(id);
  }

  getUnusedToppings(): Topping[] {
    return this.allToppingsList.filter(topping => !this.pizzaToBeCompared.toppings.find(
      t => t.id === topping.id && t.name === topping.name)
    );
  }

  onAddIngredient() {
    const submittedId = +this.ingredientForm.value.topping;
    const newTopping = this.allToppingsList.find(topping => topping.id === submittedId);
    if (newTopping) {
      this.pizzaToBeCompared.addTopping(newTopping);
    }
  }
}
