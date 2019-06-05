import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {BannerComponent} from './banner/banner.component';
import {FooterComponent} from './footer/footer.component';
import {GridComponent} from './grid/grid.component';
import {PizzasComponent} from './pizzas/pizzas.component';
import {AppRoutingModule} from './app-routing.module';
import {ErrorPageComponent} from './error-page/error-page.component';
import {PizzasListComponent} from './pizzas/pizzas-list/pizzas-list.component';
import {PizzasCompareComponent} from './pizzas/pizzas-compare/pizzas-compare.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PizzaService} from './pizzas/services/pizza.service';
import {ToppingsService} from './pizzas/services/toppings.service';
import {EnumToArrayPipe} from './shared/enum-to-array.pipe';
import {ToppingsToString} from './shared/toppings-to-string';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {PricesToStringPipe} from './shared/prices-to-string.pipe';
import {DecimalPipe} from '@angular/common';
import {APIInterceptor} from './pizzas/services/APIInterceptor';
import { ClickStopPropagationDirective } from './shared/click-stop-propagation.directive';
import { PizzaPlacesComponent } from './pizza-places/pizza-places.component';
import {PizzaPlaceService} from './pizzas/services/pizza-place.service';
import { MapPizzaPlacesComponent } from './pizza-places/map-pizza-places/map-pizza-places.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BannerComponent,
    FooterComponent,
    GridComponent,
    PizzasComponent,
    ErrorPageComponent,
    PizzasListComponent,
    PizzasCompareComponent,
    EnumToArrayPipe,
    ToppingsToString,
    PricesToStringPipe,
    ClickStopPropagationDirective,
    PizzaPlacesComponent,
    MapPizzaPlacesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [PizzaPlaceService, PizzaService, ToppingsService, DecimalPipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: APIInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent],
  entryComponents: [PizzasCompareComponent]
})
export class AppModule { }
