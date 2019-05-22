import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {BannerComponent} from './banner/banner.component';
import {FooterComponent} from './footer/footer.component';
import {GridComponent} from './grid/grid.component';
import {DropdownDirective} from './shared/dropdown.directive';
import {PizzasComponent} from './pizzas/pizzas.component';
import {AppRoutingModule} from './app-routing.module';
import {ErrorPageComponent} from './error-page/error-page.component';
import {PizzasListComponent} from './pizzas/pizzas-list/pizzas-list.component';
import {PizzasCompareComponent} from './pizzas/pizzas-compare/pizzas-compare.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {PizzaService} from './pizzas/services/pizza.service';
import {ToppingsService} from './pizzas/services/toppings.service';
import { EnumToArrayPipe } from './shared/enum-to-array.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BannerComponent,
    FooterComponent,
    GridComponent,
    DropdownDirective,
    PizzasComponent,
    ErrorPageComponent,
    PizzasListComponent,
    PizzasCompareComponent,
    EnumToArrayPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [PizzaService, ToppingsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
