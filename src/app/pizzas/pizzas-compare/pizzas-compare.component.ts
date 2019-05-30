import {Component, OnInit, ViewChild} from '@angular/core';
import {Pizza, PizzaCompareResult} from '../models/pizza.model';
import {Size} from '../models/pizza-price.model';
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
  paramsSubscription: Subscription;
  @ViewChild('form') ingredientForm: NgForm;

  pizzaToBeCompared: Pizza;
  allPizzasList: Pizza[] = [];
  allToppingsList: Topping[] = [];
  sizeTypes = Size;

  extraToppingPrice = 0.5;
  selectedSize = Size.M;

  constructor(private pizzaService: PizzaService, private toppingsService: ToppingsService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.paramsSubscription = this.route.params.subscribe(
      (params: Params) => {
        this.pizzaToBeCompared = this.pizzaService.getPizzaById(+params['id']);
        this.pizzaToBeCompared.name = this.getNewName();
      }
    );

    // TODO sort using new priority field
    this.toppingsService.getToppings()
      .subscribe(
        (response) => this.allToppingsList = response,
        (error) => console.log(error)
      );

    this.pizzaService.getPizzas()
      .subscribe(
        (response) => this.allPizzasList = response,
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

  setComparisonSize(event) {
    this.selectedSize = event.target.value;
  }

  getComparedPizzas(): PizzaCompareResult[] {
    // getting compare array
    // only consider pizzas which have a price defined for the selected size
    const compare = this.allPizzasList.slice()
      .filter(pizza => pizza.hasPriceForSize(Size[this.selectedSize]))
      .map(pizza => pizza.compareToOther(this.pizzaToBeCompared));

    // getting new prices based on size, number of extra toppings and extra topping price
    compare.forEach(pc => {
      pc.newPrice = pc.originalPizza.getPriceForSize(Size[this.selectedSize]) + pc.missing.length * this.extraToppingPrice;
    });

    // sorting on price and least additions
    compare.sort((a, b) => PizzaCompareResult.cheapestLeastAdditions(a, b));

    return compare;
  }

  savePizza(pizza: Pizza) {
    this.pizzaService.savePizza(pizza).subscribe(
      () => this.pizzaService.getPizzas(),
      (error) => console.log(error)
    );
  }

  getNewName(): string {
    if (!this.pizzaToBeCompared.name.startsWith('My new ')) {
      return 'My new ' + this.pizzaToBeCompared.name;
    } else if (this.pizzaToBeCompared.name.match(/v[0-9]+/g)) {
      const suffix = this.pizzaToBeCompared.name.match(/v[0-9]+/g)[0];
      let number = +suffix.split('v')[1];
      number++;
      return this.pizzaToBeCompared.name.split(suffix)[0] + 'v' + number;
    } else {
      return this.pizzaToBeCompared.name + ' v2';
    }
  }
}
