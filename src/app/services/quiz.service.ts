import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private _http:HttpClient) { }

  public quizzes(){
    return this._http.get(`${baseUrl}/quiz/`);
  }

  public addQuiz(quiz: { title: string; description: string; maxMarks: string; numberOfQuestions: string; active: boolean; category: { cid: string; }; }) {
    return this._http.post(`${baseUrl}/quiz/`,quiz);
  }

  public deleteQuiz(qId) {
    return this._http.delete(`${baseUrl}/quiz/${qId}`);
  }
 
  public getQuiz(qId){
    return this._http.get (`${baseUrl}/quiz/${qId}`);
  }

  public updateQuiz(quiz){
    return this._http.put(`${baseUrl}/quiz/`,quiz); 
  }

  //get quizzes of category
  public getQuizzesOfCategory(cid){
    return this._http.get(`${baseUrl}/quiz/category/${cid}`); 
  }

  //get active quizzes
  public getActiveQuizzes(){
    return this._http.get(`${baseUrl}/quiz/active`); 
  }

  //get active quizzes of category
  public getActiveQuizzesOfCategory(cid){
    return this._http.get(`${baseUrl}/quiz/category/active/${cid}`); 
  }
}
