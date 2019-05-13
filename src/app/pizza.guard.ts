import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {PizzaService} from './pizzas/services/pizza.service';

@Injectable({
  providedIn: 'root'
})
export class PizzaGuard implements CanActivate {
  constructor(private pizzaService: PizzaService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    const id = +route.params['id'];
    if (this.pizzaService.getPizzaById(id)) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
