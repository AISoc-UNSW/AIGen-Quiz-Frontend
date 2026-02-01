import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { VideoQuizService, QuizVideo } from '../../service/video-quiz.service';
import { Router } from '@angular/router';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-video-quiz',
  standalone: false,
  
  templateUrl: './video-quiz.component.html',
  styleUrl: './video-quiz.component.scss'
})
export class VideoQuizComponent implements OnInit, OnDestroy {
  currentVideo: QuizVideo | null = null;
  quizOver: boolean = false;
  disableInput: boolean = false;
  showCorrectAnswer: boolean = false;
  correctAnswerLabel: string = '';

  score: number = 0;
  totalquestions: number = 0;
  
  // Timer
  timer = 100; 
  interval= 100; // 15 second
  private destroy$ = new Subject<void>(); // To handle Cleanup

  constructor(private quizService: VideoQuizService, private router: Router,private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
      this.initializeQuestions();
      this.startTimer();
  }

   // Stop the timer when leaving the page
   ngOnDestroy(): void {
    this.destroy$.next(); // Stop any running timers
    this.destroy$.complete(); // Prevent memory leaks
  }

  // Initialize the questions and load the first one
  initializeQuestions() {
    this.totalquestions = this.quizService.initializeQuestions();
    this.loadQuestion(); // load the first question
  }

  startTimer(){
    this.timer = 100;
    interval(this.interval)
      .pipe(takeUntil(this.destroy$)) // Auto-stop when component is destroyed
      .subscribe(() =>{
        if(this.timer > 0){
          this.timer -= 0.5;
        } else {
          this.destroy$.next(); // Stop current interval before starting a new one
          alert("Oops! You ran out of Time.");
          this.loadQuestion();
        }
      });
  }

  loadQuestion() {
    this.showCorrectAnswer = false;
    this.disableInput = false;
    this.currentVideo = this.quizService.getNextQuestion();

    if (!this.currentVideo) {
      this.quizOver = true;
    } else {
      this.startTimer();

      setTimeout(() => {
        const videoElement = document.querySelector('video');
        if (videoElement) {
          videoElement.load();
          videoElement.play().catch(err => console.log("Autoplay prevented:", err));
        }
      }, 100);
    }

    this.cdr.detectChanges();
  }

  checkAnswer(isAI: boolean) {
    if (this.disableInput || !this.currentVideo) return;

    if (this.currentVideo.isAI === isAI) {
      alert('Correct! Loading next video...');
      this.score += 1;
      this.destroy$.next();
      setTimeout(() => this.loadQuestion(), 500);
    } else {
      alert('Wrong! The correct answer is shown below.');
      this.correctAnswerLabel = this.currentVideo.isAI ? 'AI' : 'Real';
      this.showCorrectAnswer = true;
      this.disableInput = true;
      this.destroy$.next();
      setTimeout(() => this.loadQuestion(), 2000);
    }
  }

  gotoMenu() {
    if (confirm("Sure you wanna go back to the Menu?")){
      this.router.navigate(['/menu']);
    }
  }

  quit() {
    if(confirm("You sure you wanna quit?? Its not that difficult.")){
      this.router.navigate(['']);
    }
  }

  button_pressed(event: Event) {
    const target = event.target as HTMLElement;
    target.style.transform = 'scale(0.95)';
    target.style.backgroundColor = '#3d1912';
    target.style.color = '#fff'

  }

  button_released(event: Event) {
    const target = event.target as HTMLElement;
    target.style.transform = 'scale(1)';
    target.style.backgroundColor = '#fff';
    target.style.color = '#0d172a'
  }
}
