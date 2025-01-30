import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, HeaderComponent]
})
export class TodoComponent {
  tasks: string[] = [];
  completedTasks: string[] = [];
  newTask: string = '';
  editIndex: number | null = null;
  editCompletedIndex: number | null = null;

  constructor(private cookieService: CookieService) {
    this.loadTasks();
  }

  addOrUpdateTask() {
    if (this.newTask.trim()) {
      if (this.editIndex !== null) {
        this.tasks[this.editIndex] = this.newTask.trim();
        this.editIndex = null;
      } else {
        this.tasks.push(this.newTask.trim());
      }
      this.newTask = '';
      this.saveTasks();
    }
  }

  markAsCompleted(index: number) {
    const completedTask = this.tasks.splice(index, 1)[0];
    this.completedTasks.push(completedTask);
    this.saveTasks();
  }

  setEditTask(index: number) {
    this.editIndex = index;
    this.newTask = this.tasks[index];
  }

  removeTask(index: number) {
    this.tasks.splice(index, 1);
    if (this.editIndex === index) {
      this.editIndex = null;
      this.newTask = '';
    }
    this.saveTasks();
  }

  setEditCompletedTask(index: number) {
    this.editCompletedIndex = index;
    this.newTask = this.completedTasks[index];
  }

  updateCompletedTask() {
    if (this.editCompletedIndex !== null) {
      this.completedTasks[this.editCompletedIndex] = this.newTask.trim();
      this.editCompletedIndex = null;
      this.newTask = '';
      this.saveTasks();
    }
  }

  removeCompletedTask(index: number) {
    this.completedTasks.splice(index, 1);
    this.saveTasks();
  }

  unmarkAsCompleted(index: number) {
    const taskToUndo = this.completedTasks.splice(index, 1)[0];
    this.tasks.push(taskToUndo);
    this.saveTasks();
  }

  cancelEdit() {
    this.editIndex = null;
    this.newTask = '';
  }

  saveTasks() {
    this.cookieService.set('tasks', JSON.stringify(this.tasks));
    this.cookieService.set('completedTasks', JSON.stringify(this.completedTasks));
  }

  loadTasks() {
    const tasks = this.cookieService.get('tasks');
    const completedTasks = this.cookieService.get('completedTasks');
    this.tasks = tasks ? JSON.parse(tasks) : [];
    this.completedTasks = completedTasks ? JSON.parse(completedTasks) : [];
  }

  setNewTask(event: Event) {
    const input = event.target as HTMLInputElement;
    this.newTask = input.value;
  }
}
