import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private _http:HttpClient) { }

  public getQuestionsOfQuiz(qid){
   return this._http.get(`${baseUrl}/question/quiz/all/${qid}`);
    //return this._http.get(`${baseUrl}/question/quiz/${qid}`);
    
  }

  

  public addQuestion(question) {
    return this._http.post(`${baseUrl}/question/`,question)  ;
  }

  public updateQuestion(question) {
    return this._http.put(`${baseUrl}/question/`,question)  ;
  }

  public getSingleQuestion(quesId){
    return this._http.get(`${baseUrl}/question/${quesId}`);
     //return this._http.get(`${baseUrl}/question/quiz/${qid}`);
     
   }

  public deleteQuestion(questionId) {
    return this._http.delete(`${baseUrl}/question/${questionId}`)  ;
  }

  public getQuestionsOfQuizForTest(qid){
    
     return this._http.get(`${baseUrl}/question/quiz/${qid}`);
     
   }

  public evalQuiz(question) {
    return this._http.post(`${baseUrl}/question/eval-quiz`,question)  ;
   }
}
