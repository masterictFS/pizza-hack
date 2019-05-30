import {Component, Input} from '@angular/core';
import {Pizza} from '../models/pizza.model';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-pizzas-list',
  templateUrl: './pizzas-list.component.html',
  styleUrls: ['./pizzas-list.component.css']
})
export class PizzasListComponent {
  @Input() pizzas: Pizza[];
  @Input() originalPizzas: Pizza[];
  @Input() isDefaultPizza: boolean;

  filter = new FormControl('');

  constructor() {
    this.filter.valueChanges.subscribe(
      (response) => {
        this.pizzas = this.originalPizzas.filter(p => p.containsAll(response));
      },
      (error) => console.log(error)
    );
  }
}
