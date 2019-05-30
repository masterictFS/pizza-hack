import {Pipe, PipeTransform} from '@angular/core';
import {PizzaPrice} from '../pizzas/models/pizza-price.model';
import {DecimalPipe} from '@angular/common';

@Pipe({
  name: 'pricesToString'
})
export class PricesToStringPipe implements PipeTransform {

  constructor(private decimalPipe: DecimalPipe) {}

  transform(pricesArray: PizzaPrice[]): String {
    return pricesArray.map(
      p => p.size + ': ' + this.decimalPipe.transform(p.price, '1.2-2')
    ).join(', ');
  }

}
