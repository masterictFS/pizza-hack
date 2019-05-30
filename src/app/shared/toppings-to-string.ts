import {Pipe, PipeTransform} from '@angular/core';
import {Topping} from '../pizzas/models/topping.model';

@Pipe({
  name: 'toppingsToString'
})
export class ToppingsToString implements PipeTransform {

  transform(toppingsArray: Topping[]): String {
    return toppingsArray.map(t => t.name).join(', ');
  }

}
