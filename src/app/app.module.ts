import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {DropdownDirective} from './shared/dropdown.directive';
import {PizzasComponent} from './pizzas/pizzas.component';
import {AppRoutingModule} from './app-routing.module';
import {ErrorPageComponent} from './error-page/error-page.component';
import {PizzasListComponent} from './pizzas/pizzas-list/pizzas-list.component';
import {PizzasCompareComponent} from './pizzas/pizzas-compare/pizzas-compare.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {PizzaService} from './pizzas/services/pizza.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DropdownDirective,
    PizzasComponent,
    ErrorPageComponent,
    PizzasListComponent,
    PizzasCompareComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [PizzaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
