import { ConverterComponent } from './currency/currency.component';
import { Routes } from '@angular/router';
import { WishlistComponent } from './wishlist/wishlist.component';
import { TodoComponent } from './todo/todo.component';
import { TimerComponent } from './timer/timer.component';
import { CalorieCalculatorComponent } from './calorie-calculator/calorie-calculator.component';
import { MainPageComponent } from './main-page/main-page.component';
import { AppComponent } from './app.component';


export const routes: Routes = [
      {path : '', component : MainPageComponent},
      {path : 'wishlist', component : WishlistComponent},
      {path : 'todo', component : TodoComponent},
      {path : 'timer', component : TimerComponent},
      {path : 'calories', component : CalorieCalculatorComponent},
      {path : 'currency', component : ConverterComponent}
  ];
