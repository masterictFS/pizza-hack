import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-pizza-places',
  templateUrl: './pizza-places.component.html',
  styleUrls: ['./pizza-places.component.css']
})
export class PizzaPlacesComponent implements OnInit {

  pizzaPlaceTag: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.pizzaPlaceTag = this.route.snapshot.params['pizza_place_tag'];
  }

}
