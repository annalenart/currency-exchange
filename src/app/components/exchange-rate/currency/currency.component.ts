import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss']
})
export class CurrencyComponent implements OnInit {
  @Input() currenciesList: Array<string>;
  @Output() currencyChanged = new EventEmitter<string>();
  @Output() amountChanged = new EventEmitter<number>();

  amount: number;
  selectedCurrency: string;

  ngOnInit(): void {
    this.selectedCurrency = 'USD';
    this.currencyChanged.emit(this.selectedCurrency)
  }

  currencyPicked(currency: string) {
    this.currencyChanged.emit(currency);
  }

  onAmountChanged(value: string) {
    this.amountChanged.emit(+value);
  }

  setAmount(amount: number) {
    this.amount = amount;
  }

  setCurrency(currency: string) {
    this.selectedCurrency = currency;
  }
}
