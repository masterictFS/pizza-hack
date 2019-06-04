import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PizzaPlaceService} from '../pizzas/services/pizza-place.service';

@Component({
  selector: 'app-pizza-places',
  templateUrl: './pizza-places.component.html',
  styleUrls: ['./pizza-places.component.css']
})
export class PizzaPlacesComponent implements OnInit {

  pizzaPlaceTag: string;

  constructor(private pizzaPlaceService: PizzaPlaceService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.pizzaPlaceTag = this.route.snapshot.params['pizza_place_tag'];
    this.pizzaPlaceService.changePizzaPlaceTag(this.pizzaPlaceTag);
  }

}
