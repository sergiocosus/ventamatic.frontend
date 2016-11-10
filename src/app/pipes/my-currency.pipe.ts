import { Pipe, PipeTransform } from '@angular/core';
import {NumberFormatter, NumberFormatStyle} from "@angular/common/src/facade/intl";

@Pipe({
  name: 'myCurrency'
})
export class MyCurrencyPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return NumberFormatter.format(value, 'USD', NumberFormatStyle.Currency, {
      minimumIntegerDigits: 1,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      currency: 'usd',
      currencyAsSymbol: true
    });
  }

}
