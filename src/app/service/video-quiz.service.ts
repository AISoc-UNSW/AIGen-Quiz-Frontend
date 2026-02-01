import { Injectable } from "@angular/core";

export interface QuizVideo {
    path: string;
    isAI: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class VideoQuizService {
    private videoList: QuizVideo[] = [
        { path: `assets/Videos/Video_Real_1.mp4`, isAI: false },
        { path: `assets/Videos/Video_Real_2.mp4`, isAI: false },
        { path: `assets/Videos/Video_Real_3.mp4`, isAI: false },
        { path: `assets/Videos/Video_Real_4.mp4`, isAI: false },
        { path: `assets/Videos/Video_Real_5.mp4`, isAI: false },
        { path: `assets/Videos/Video_Real_6.mp4`, isAI: false },
        { path: `assets/Videos/Video_Real_7.mp4`, isAI: false },
        { path: `assets/Videos/Video_Real_8.mp4`, isAI: false },
        { path: `assets/Videos/Video_Real_9.mp4`, isAI: false },
        { path: `assets/Videos/Video_Real_10.mp4`, isAI: false },
        { path: `assets/Videos/Video_AI_1.mp4`, isAI: true },
        { path: `assets/Videos/Video_AI_2.mp4`, isAI: true },
        { path: `assets/Videos/Video_AI_3.mp4`, isAI: true },
        { path: `assets/Videos/Video_AI_4.mp4`, isAI: true },
        { path: `assets/Videos/Video_AI_5.mp4`, isAI: true },
        { path: `assets/Videos/Video_AI_6.mp4`, isAI: true },
        { path: `assets/Videos/Video_AI_7.mp4`, isAI: true },
        { path: `assets/Videos/Video_AI_8.mp4`, isAI: true },
        { path: `assets/Videos/Video_AI_9.mp4`, isAI: true },
        { path: `assets/Videos/Video_AI_10.mp4`, isAI: true },
    ];

    private questionQueue: QuizVideo[] = []; // Queue for video questions

    initializeQuestions(): number {
        // Shuffle and pick a random set of 10 from the full list
        this.questionQueue = [...this.videoList]
            .sort(() => Math.random() - 0.5)
            .slice(0, 10);

        return this.questionQueue.length;
    }

    getNextQuestion(): QuizVideo | null {
        // No more questions left
        if (this.questionQueue.length === 0) {
            return null;
        }

        // Get the next video and remove it from the queue
        const video = this.questionQueue.shift();
        
        return video || null;
    }
    
}