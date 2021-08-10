import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { CurrenciesProviderService, CurrencyRates } from '../../currencies-provider.service';
import { CurrencyComponent } from './currency/currency.component';

@Component({
  selector: 'app-exchange-rate',
  templateUrl: './exchange-rate.component.html',
  styleUrls: ['./exchange-rate.component.scss']
})
export class ExchangeRateComponent implements OnInit {
  currenciesList$: Observable<Array<string>>;
  initialCurrencyCode: string;
  targetCurrencyCode: string;
  initialCurrencyRates: CurrencyRates;
  initialCurrencyAmount: number;
  targetCurrencyAmount: number;
  @ViewChild('initial') initial: CurrencyComponent;
  @ViewChild('target') target: CurrencyComponent;

  constructor(private currenciesProvider: CurrenciesProviderService) {
  }

  ngOnInit(): void {
    this.currenciesList$ = this.currenciesProvider.getCurrenciesNames();
  }

  setInitialCurrency(currencyCode: string): void {
    this.initialCurrencyCode = currencyCode;

    this.currenciesProvider.getCurrencyDetails(currencyCode).subscribe(currencyRates => {
      this.initialCurrencyRates = currencyRates;
      this.initialCurrencyAmount && this.initialToTarget()
    });
  }

  convertTo(amount: number): void {
    this.initialCurrencyAmount = amount;
    this.initialToTarget()
   }

  setTargetCurrency(currencyCode: string): void  {
    this.targetCurrencyCode = currencyCode;
    this.initialCurrencyAmount && this.initialToTarget()
  }

  convertFrom(amount: number): void {
    this.targetCurrencyAmount = amount;
    this.targetToInitial()
  }

  initialToTarget(): void {
    this.targetCurrencyAmount = this.initialCurrencyAmount * this.initialCurrencyRates[this.targetCurrencyCode];
    this.targetCurrencyAmount = +(this.targetCurrencyAmount).toFixed(4)
    this.target.setAmount(this.targetCurrencyAmount);
  }

  targetToInitial(): void {
    this.initialCurrencyAmount = this.targetCurrencyAmount / this.initialCurrencyRates[this.targetCurrencyCode];
    this.initialCurrencyAmount = +(this.initialCurrencyAmount).toFixed(4)
    this.initial.setAmount(this.initialCurrencyAmount);
  }

  swapCurrencies() {
    [this.initialCurrencyCode, this.targetCurrencyCode] = [this.targetCurrencyCode, this.initialCurrencyCode];
    this.setInitialCurrency(this.initialCurrencyCode);
    this.initial.setCurrency(this.initialCurrencyCode);
    this.target.setCurrency(this.targetCurrencyCode);
  }
}

