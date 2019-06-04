import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {PizzaPlaceService} from './pizzas/services/pizza-place.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PizzaPlaceGuard implements CanActivate {
  constructor(private pizzaPlaceService: PizzaPlaceService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    const tag = route.params['pizza_place_tag'];
    return this.pizzaPlaceService.getPizzaPlaceFromTag(tag).pipe(
      map(p => {
        if (p.length > 0) {
          return true;
        } else {
          this.router.navigate(['/']);
          return false;
        }
      })
    );
  }
}
