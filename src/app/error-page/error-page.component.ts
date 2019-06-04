import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Data} from '@angular/router';
import {PizzaPlaceService} from '../pizzas/services/pizza-place.service';
import {PizzaPlace} from '../pizzas/models/pizza-place.model';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {
  @Input() errorMessage: string;
  pizzaPlaces: PizzaPlace[] = [];

  constructor(private pizzaPlaceService: PizzaPlaceService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe((data: Data) => {
      if (!this.errorMessage) {
        this.errorMessage = data['message'];
      }
    });

    this.pizzaPlaceService.getPizzaPlaces().subscribe(
      (response) => this.pizzaPlaces = response,
      (error) => console.log(error)
    );
  }

}
