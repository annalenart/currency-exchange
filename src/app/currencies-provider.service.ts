import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';

export interface CurrencyRates {
  [key: string]: number;
}

interface Currencies {
  conversion_rates: CurrencyRates;
}

@Injectable({
  providedIn: 'root'
})
export class CurrenciesProviderService {

  constructor(private http: HttpClient) {
  }

  getCurrenciesNames(): Observable<Array<string>> {
    return this.http.get<Currencies>('https://v6.exchangerate-api.com/v6/83d22125691deb516baa179a/latest/USD')
      .pipe(
        map((data: Currencies) => Object.keys(data.conversion_rates)),
        delay(1000)
      );
  }

  getCurrencyDetails(currencyCode: string): Observable<CurrencyRates> {
    return this.http.get<Currencies>(`https://v6.exchangerate-api.com/v6/83d22125691deb516baa179a/latest/${currencyCode}`)
      .pipe(
      map((data: Currencies) => data.conversion_rates)
    );
  }
}
