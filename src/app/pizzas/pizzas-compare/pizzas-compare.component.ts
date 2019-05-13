import { Component, OnInit } from '@angular/core';
import {Pizza} from '../models/pizza.model';
import {PizzaService} from '../services/pizza.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Params} from '@angular/router';
import {Topping} from '../models/topping.model';

@Component({
  selector: 'app-pizzas-compare',
  templateUrl: './pizzas-compare.component.html',
  styleUrls: ['./pizzas-compare.component.css']
})
export class PizzasCompareComponent implements OnInit {
  pizzaToBeCompared: Pizza;
  paramsSubscription: Subscription;

  constructor(private pizzaService: PizzaService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.paramsSubscription = this.route.params.subscribe(
      (params: Params) => {
        this.pizzaToBeCompared = this.pizzaService.getPizzaById(+params['id']);
      }
    );
  }

  addSalamino() {
    console.log(this.pizzaToBeCompared);
    this.pizzaToBeCompared.addTopping(new Topping(-1, 'Salamino'));
  }
}
