import { TDifficulty } from "../../shared/constant";



export interface IInterviewEntity {
    _id: string;
    context: string;
    numberOfQuestions: number;
    difficulty: TDifficulty;
    durationInMinutes: number;
    title: string;
    description: string;
    isPremium: boolean;    
    createdAt?: Date;
    updatedAt?: Date;  
}