import { CurrencyPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gdCurrency',
  pure: false
})
export class GdI18nCurrencyPipe implements PipeTransform {

  transform(value: number): string {
      return this.isInvalidValue(value) ? '' : this.format(value);
  }

  private format(value) {
    const currencyPipe = new CurrencyPipe('pt');
    return currencyPipe.transform(value, 'BRL', 'R$');
  }

  private isInvalidValue = value => value === undefined || value == null;

}
