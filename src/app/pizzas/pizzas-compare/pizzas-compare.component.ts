import {Component, OnInit, ViewChild} from '@angular/core';
import {Pizza} from '../models/pizza.model';
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
        this.pizzaToBeCompared.name = 'My new ' + this.pizzaToBeCompared.name;
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

  getComparedPizzas() {
    const compare = this.allPizzasList.slice()
    /*  .map(pizza => pizza.compareToOther(this.pizzaToBeCompared))
      .forEach(pc => {
        pc.newPrice = pc.originalPizza.getPriceForSize(this.selectedSize) + pc.missing.length * this.extraToppingPrice;
      })*/
    ;

   /* const test = compare.slice()
      .map(pizza => pizza.compareToOther(this.pizzaToBeCompared))
      .forEach(pc => {
        pc.newPrice = pc.originalPizza.getPriceForSize(Size[this.selectedSize]) + pc.missing.length * this.extraToppingPrice;
      })

    console.log(test);*/

    /*console.log(this.selectedSize);
    console.log(Size[this.selectedSize]);
    console.log(this.pizzaToBeCompared.prices);*/
    console.log(this.pizzaToBeCompared.getPriceForSize(Size[this.selectedSize]));

    //console.log(compare);
    return compare;
  }
}
