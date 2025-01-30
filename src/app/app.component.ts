import { Component } from '@angular/core';
import { TodoComponent } from './todo/todo.component';
import { WishlistComponent } from "./wishlist/wishlist.component";
import { CalorieCalculatorComponent } from "./calorie-calculator/calorie-calculator.component";
import { TimerComponent } from "./timer/timer.component";
import { RouterOutlet } from '@angular/router';
import { ConverterComponent } from './currency/currency.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [TodoComponent, WishlistComponent, CalorieCalculatorComponent, TimerComponent, RouterOutlet, ConverterComponent, HttpClientModule],
})
export class AppComponent {}
