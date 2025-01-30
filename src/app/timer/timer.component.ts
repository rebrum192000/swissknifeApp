import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, CommonModule, HeaderComponent],
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css'],
})
export class TimerComponent implements OnInit {
  timerDuration: number = 0;
  timerInterval: any;
  timerRemaining: number = 0;
  isTimerRunning: boolean = false;

  stopwatchTime: number = 0;
  stopwatchInterval: any;
  isStopwatchRunning: boolean = false;

  private audioFileUrl: string = './assets/audio/yt1s_ro643q7.mp3';
  private audio!: HTMLAudioElement;

  ngOnInit(): void {
    localStorage.setItem('timerEndSound', this.audioFileUrl);
    this.audio = new Audio(this.audioFileUrl);
  }

  startTimer() {
    if (this.timerDuration > 0 && !this.isTimerRunning) {
      this.isTimerRunning = true;
      this.timerRemaining = this.timerDuration;

      this.timerInterval = setInterval(() => {
        if (this.timerRemaining > 0) {
          this.timerRemaining--;
        } else {
          this.stopTimer();
          this.playSound();
          alert('Таймер завершен!');
        }
      }, 1000);
    }
  }

  pauseTimer() {
    this.isTimerRunning = false;
    clearInterval(this.timerInterval);
  }

  stopTimer() {
    this.isTimerRunning = false;
    clearInterval(this.timerInterval);
    this.timerRemaining = 0;
    this.stopSound();
  }

  startStopwatch() {
    if (!this.isStopwatchRunning) {
      this.isStopwatchRunning = true;

      this.stopwatchInterval = setInterval(() => {
        this.stopwatchTime++;
      }, 1000);
    }
  }

  pauseStopwatch() {
    this.isStopwatchRunning = false;
    clearInterval(this.stopwatchInterval);
  }

  stopStopwatch() {
    this.isStopwatchRunning = false;
    clearInterval(this.stopwatchInterval);
    this.stopwatchTime = 0;
  }

  playSound() {
    if (this.audio) {
      this.audio.play();
    }
  }

  stopSound() {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }
  }
}
