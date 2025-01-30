import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../services/currency.service';
import { NgFor, NgIf, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from "../header/header.component";
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-converter',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, HeaderComponent, CommonModule, HttpClientModule],
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.css']
})
export class ConverterComponent implements OnInit {

  rubAmount: number = 0;
  exchangeRates: any = {};
  convertedValues: any = {};
  currencyList = ['USD', 'EUR', 'CNY', 'JPY', 'INR'];

  constructor(private currencyService: CurrencyService) { }

  ngOnInit(): void {
    this.getRates();
  }

  getRates(): void {
    this.currencyService.getExchangeRates('RUB').subscribe(
      data => {
        this.exchangeRates = data.conversion_rates;
        console.log('Получены курсы обмена:', this.exchangeRates);
        this.convert();
      },
      error => {
        console.error('Ошибка при получении курсов обмена:', error);
      }
    );
  }

  convert(): void {
    console.log('Вызов convert() с rubAmount:', this.rubAmount);
    this.rubAmount = Number(this.rubAmount);
    if (this.exchangeRates) {
      this.convertedValues = {};
      for (let currency of this.currencyList) {
        const rate = this.exchangeRates[currency];
        if (rate) {
          this.convertedValues[currency] = this.rubAmount * rate;
          console.log(`Конвертация: ${this.rubAmount} RUB = ${this.convertedValues[currency]} ${currency}`);
        } else {
          console.warn(`Курс для ${currency} не найден.`);
        }
      }
    } else {
      console.warn('Курсы обмена не определены.');
    }
  }
}

