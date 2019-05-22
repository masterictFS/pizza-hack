import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enumToArray'
})
export class EnumToArrayPipe implements PipeTransform {

  // keys are listed twice, first with the "real" key, then with the value
  transform(enumData: Object): String[] {
    const keys = Object.keys(enumData);
    return keys.slice(keys.length / 2);
  }

}
