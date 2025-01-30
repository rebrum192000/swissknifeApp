import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from "../header/header.component";

enum MealType {
  Breakfast = 'breakfast',
  Lunch = 'lunch',
  Dinner = 'dinner'
}

interface FoodItem {
  name: string;
  calories: number;
  mealType: MealType;
}

interface Workout {
  type: string;
  caloriesBurned: number;
}

interface FoodItemsByDate {
  [date: string]: {
      breakfast: FoodItem[];
      lunch: FoodItem[];
      dinner: FoodItem[];
  };
}

@Component({
  selector: 'app-calorie-calculator',
  templateUrl: './calorie-calculator.component.html',
  styleUrls: ['./calorie-calculator.component.css'],
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, CommonModule, HeaderComponent],
})

export class CalorieCalculatorComponent implements OnInit {
  foodItemsByDate: FoodItemsByDate = {};
  workoutsByDate: { [key: string]: Workout[] } = {};
  selectedDate: string = this.getCurrentDate();
  newMealType: MealType = MealType.Breakfast;

  newFoodName: string = '';
  newFoodCalories: number | null = null;
  newWorkoutType: string = '';
  newCaloriesBurned: number | null = null;

  ngOnInit() {
    this.loadFoodItemsFromLocalStorage();
    this.loadWorkoutsFromLocalStorage();
  }

  getCurrentDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  addFoodItem() {
    if (this.newFoodName && this.newFoodCalories !== null) {
      const newItem: FoodItem = {
        name: this.newFoodName,
        calories: this.newFoodCalories,
        mealType: this.newMealType,
      };

      if (!this.foodItemsByDate[this.selectedDate]) {
        this.foodItemsByDate[this.selectedDate] = { breakfast: [], lunch: [], dinner: [] };
      }

      this.foodItemsByDate[this.selectedDate][this.newMealType].push(newItem);
      this.saveFoodItemsToLocalStorage();
      this.resetFields();
    }
  }

  addWorkout() {
    if (this.newWorkoutType && this.newCaloriesBurned !== null) {
      const newWorkout: Workout = {
        type: this.newWorkoutType,
        caloriesBurned: this.newCaloriesBurned,
      };

      if (!this.workoutsByDate[this.selectedDate]) {
        this.workoutsByDate[this.selectedDate] = [];
      }

      this.workoutsByDate[this.selectedDate].push(newWorkout);
      this.saveWorkoutsToLocalStorage();
      this.resetWorkoutFields();
      this.newWorkoutType = '';
      this.newCaloriesBurned = null;

    }
  }

  getTotalCalories(): number {
    const meals = this.foodItemsByDate[this.selectedDate] || { breakfast: [], lunch: [], dinner: [] };
    return (
      meals.breakfast.reduce((total, item) => total + item.calories, 0) +
      meals.lunch.reduce((total, item) => total + item.calories, 0) +
      meals.dinner.reduce((total, item) => total + item.calories, 0)
    );
  }

  getTotalCaloriesBurned(): number {
    return (this.workoutsByDate[this.selectedDate] || []).reduce((total, workout) => total + workout.caloriesBurned, 0);
  }

  getCaloricDeficit(): number {
    return this.getTotalCalories() - this.getTotalCaloriesBurned();
  }

  saveFoodItemsToLocalStorage() {
    localStorage.setItem('foodItems', JSON.stringify(this.foodItemsByDate));
    localStorage.setItem('workouts', JSON.stringify(this.workoutsByDate));
  }

  loadFoodItemsFromLocalStorage() {
    const foodItemsData = localStorage.getItem('foodItems');
    const workoutsData = localStorage.getItem('workouts');

    if (foodItemsData) {
      this.foodItemsByDate = JSON.parse(foodItemsData);
    }

    if (workoutsData) {
      this.workoutsByDate = JSON.parse(workoutsData);
    }
  }

  saveWorkoutsToLocalStorage() {
    localStorage.setItem('workoutsByDate', JSON.stringify(this.workoutsByDate));
}

  resetFields() {
    this.newFoodName = '';
    this.newFoodCalories = null;
  }

  selectDate(date: string) {
    this.selectedDate = date;
  }

  getAvailableDates(): string[] {
    return Object.keys(this.foodItemsByDate);
  }

  loadWorkoutsFromLocalStorage() {
    const data = localStorage.getItem('workoutsByDate');
    if (data) {
        this.workoutsByDate = JSON.parse(data);
    }
  }
  resetWorkoutFields() {
    this.newWorkoutType = '';
    this.newCaloriesBurned = null;
  }
}
