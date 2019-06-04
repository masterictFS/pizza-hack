import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PizzasComponent} from './pizzas/pizzas.component';
import {ErrorPageComponent} from './error-page/error-page.component';
import {PizzasCompareComponent} from './pizzas/pizzas-compare/pizzas-compare.component';
import {PizzaGuard} from './pizza.guard';
import {PizzaPlacesComponent} from './pizza-places/pizza-places.component';
import {PizzaPlaceGuard} from './pizza-place.guard';

const appRoutes: Routes = [
  {path: '', redirectTo: '/keep-hacking', pathMatch: 'full'},
  {path: 'keep-hacking', component: ErrorPageComponent, data: {message: 'Keep looking for a pizza place to hack ;)'}},
  {path: ':pizza_place_tag', component: PizzaPlacesComponent, canActivate: [PizzaPlaceGuard], children: [
    {path: '', redirectTo: 'pizzas', pathMatch: 'full'},
    {path: 'pizzas', component: PizzasComponent, children: [
      {path: '', pathMatch: 'full', component: ErrorPageComponent, data: {message: 'select a pizza to hack luv'}},
      {path: ':id', component: PizzasCompareComponent, canActivate: [PizzaGuard]}
      ]},
    ]},
  {path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not found!'}},
  {path: '**', redirectTo: '/not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
