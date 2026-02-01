// Service for Image Quiz
import { Injectable } from "@angular/core";

export interface QuizImage {
    path: string;
    isAI: boolean;
    highlighted?: boolean;
}

interface ImagePair {
    id: number;
    real: string;
    ai: string;
}

@Injectable({
    providedIn: 'root'
})
export class ImageQuizService {
    // Abstract Art image pairs
    private abstractArtPairs: ImagePair[] = [
        { id: 1, real: 'assets/Images/Abstract Art/1.jpg', ai: 'assets/Images/Abstract Art/1_AI.png' },
        { id: 2, real: 'assets/Images/Abstract Art/2.jpg', ai: 'assets/Images/Abstract Art/2_AI.jpg' },
        { id: 3, real: 'assets/Images/Abstract Art/3.jpeg', ai: 'assets/Images/Abstract Art/3_AI.png' },
        { id: 4, real: 'assets/Images/Abstract Art/4.jpg', ai: 'assets/Images/Abstract Art/4_AI.png' },
        { id: 5, real: 'assets/Images/Abstract Art/5.jpg', ai: 'assets/Images/Abstract Art/5_AI.png' },
        { id: 6, real: 'assets/Images/Abstract Art/6.jpg', ai: 'assets/Images/Abstract Art/6_AI.png' },
        { id: 7, real: 'assets/Images/Abstract Art/7.jpg', ai: 'assets/Images/Abstract Art/7_AI.png' },
        { id: 8, real: 'assets/Images/Abstract Art/8.jpg', ai: 'assets/Images/Abstract Art/8_AI.png' },
        { id: 9, real: 'assets/Images/Abstract Art/9.jpg', ai: 'assets/Images/Abstract Art/9_AI.png' },
        { id: 10, real: 'assets/Images/Abstract Art/10.jpg', ai: 'assets/Images/Abstract Art/10_AI.png' },
        { id: 11, real: 'assets/Images/Abstract Art/11.jpg', ai: 'assets/Images/Abstract Art/11_AI.png' },
        { id: 12, real: 'assets/Images/Abstract Art/12.png', ai: 'assets/Images/Abstract Art/12_AI.png' },
        { id: 13, real: 'assets/Images/Abstract Art/13.jpg', ai: 'assets/Images/Abstract Art/13_AI.png' },
        { id: 14, real: 'assets/Images/Abstract Art/14.png', ai: 'assets/Images/Abstract Art/14_AI.png' },
        { id: 15, real: 'assets/Images/Abstract Art/15.jpg', ai: 'assets/Images/Abstract Art/15_AI.png' },
        { id: 16, real: 'assets/Images/Abstract Art/16.jpg', ai: 'assets/Images/Abstract Art/16_AI.jpg' }
    ];

    // Handwriting image pairs
    private handwritingPairs: ImagePair[] = [
        { id: 1, real: 'assets/Images/Handwriting/Handwriting_Real_1.webp', ai: 'assets/Images/Handwriting/Handwriting_AI_1.png' },
        { id: 2, real: 'assets/Images/Handwriting/Handwriting_Real_2.webp', ai: 'assets/Images/Handwriting/Handwriting_AI_2.png' },
        { id: 3, real: 'assets/Images/Handwriting/Handwriting_Real_3.webp', ai: 'assets/Images/Handwriting/Handwriting_AI_3.png' },
        { id: 4, real: 'assets/Images/Handwriting/Handwriting_Real_4.webp', ai: 'assets/Images/Handwriting/Handwriting_AI_4.png' },
        { id: 5, real: 'assets/Images/Handwriting/Handwriting_Real_5.webp', ai: 'assets/Images/Handwriting/Handwriting_AI_5.png' },
        { id: 6, real: 'assets/Images/Handwriting/Handwriting_Real_6.webp', ai: 'assets/Images/Handwriting/Handwriting_AI_6.png' },
        { id: 7, real: 'assets/Images/Handwriting/Handwriting_Real_7.webp', ai: 'assets/Images/Handwriting/Handwriting_AI_7.png' },
        { id: 8, real: 'assets/Images/Handwriting/Handwriting_Real_8.webp', ai: 'assets/Images/Handwriting/Handwriting_AI_8.png' },
        { id: 9, real: 'assets/Images/Handwriting/Handwriting_Real_9.webp', ai: 'assets/Images/Handwriting/Handwriting_AI_9.png' },
        { id: 10, real: 'assets/Images/Handwriting/Handwriting_Real_10.webp', ai: 'assets/Images/Handwriting/Handwriting_AI_10.png' },
        { id: 11, real: 'assets/Images/Handwriting/Handwriting_Real_11.webp', ai: 'assets/Images/Handwriting/Handwriting_AI_11.png' },
        { id: 12, real: 'assets/Images/Handwriting/Handwriting_Real_12.webp', ai: 'assets/Images/Handwriting/Handwriting_AI_12.png' },
        { id: 13, real: 'assets/Images/Handwriting/Handwriting_Real_13.webp', ai: 'assets/Images/Handwriting/Handwriting_AI_13.png' },
        { id: 14, real: 'assets/Images/Handwriting/Handwriting_Real_14.webp', ai: 'assets/Images/Handwriting/Handwriting_AI_14.png' },
        { id: 15, real: 'assets/Images/Handwriting/Handwriting_Real_15.webp', ai: 'assets/Images/Handwriting/Handwriting_AI_15.png' }
    ];

    private imagePairs: ImagePair[] = [];
    private questionQueue: ImagePair[] = [];
    private currentCategory: string = 'abstract-art';

    // Set the category and initialize questions
    setCategory(category: 'abstract-art' | 'handwriting'): void {
        this.currentCategory = category;
        this.imagePairs = category === 'handwriting' ? this.handwritingPairs : this.abstractArtPairs;
        this.questionQueue = [];
    }

    // Get current category
    getCategory(): string {
        return this.currentCategory;
    }

    // Prepare up to 10 random questions from the selected category
    initializeQuestions(): void {
        if (this.imagePairs.length === 0) {
            this.setCategory('abstract-art');
        }
        const shuffled = [...this.imagePairs].sort(() => Math.random() - 0.5);
        this.questionQueue = shuffled.slice(0, 10);
    }

    // Return next question as two images (real and AI) or null when done
    getNextQuestion(): QuizImage[] | null {
        if (this.questionQueue.length === 0) return null;

        const pair = this.questionQueue.shift()!;
        const images: QuizImage[] = [
            { path: pair.real, isAI: false },
            { path: pair.ai, isAI: true }
        ];

        // Shuffle the two images so order isn't predictable
        return images.sort(() => Math.random() - 0.5);
    }
}