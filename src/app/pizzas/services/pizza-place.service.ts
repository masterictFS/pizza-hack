import {Injectable} from '@angular/core';
import {PizzaPlace} from '../models/pizza-place.model';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class PizzaPlaceService {

  private pizzaPlaces: PizzaPlace[] = [];
  private pizzaPlaceTag = new BehaviorSubject('DEFAULT_TAG');
  currentPizzaPlaceTag = this.pizzaPlaceTag.asObservable();

  constructor(private http: HttpClient) { }

  getPizzaPlaces() {
    return this.http.get<PizzaPlace[]>('pizza_places')
      .pipe(map(
        (pizzaPlaces) => {
          const pizzaPlacesObjs = pizzaPlaces.map(pizzaPlace => PizzaPlace.createPizzaPlaceObject(pizzaPlace));
          this.pizzaPlaces = pizzaPlacesObjs;
          return pizzaPlacesObjs;
        }
      ));
  }

  getPizzaPlaceFromTag(tag: string) {
    return this.http.get<PizzaPlace[]>('pizza_places/tag/' + tag)
      .pipe(map(
        (pizzaPlaces) => {
          const pizzaPlacesObjs = pizzaPlaces.map(pizzaPlace => PizzaPlace.createPizzaPlaceObject(pizzaPlace));
          this.pizzaPlaces = pizzaPlacesObjs;
          return pizzaPlacesObjs;
        }
      ));
  }

  changePizzaPlaceTag(newTag: string) {
    this.pizzaPlaceTag.next(newTag);
  }
}
