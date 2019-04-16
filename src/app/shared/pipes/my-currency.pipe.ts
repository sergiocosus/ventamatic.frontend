import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Pipe({
  name: 'myCurrency'
})
export class MyCurrencyPipe implements PipeTransform {
  constructor(private decimalPipe: DecimalPipe) {
  }

  transform(value: any, args?: any): any {
    return '$' + this.decimalPipe.transform(value, '1.2-2');
  }
}

