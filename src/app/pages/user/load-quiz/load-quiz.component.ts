import { QuizService } from './../../../services/quiz.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {

  catId;
  quizzes;

  constructor(private _route:ActivatedRoute,private _quiz:QuizService) { }

  ngOnInit(): void {
  
    this._route.params.subscribe((params)=>{
      this.catId=params.catId;
      if(this.catId == 0){
        console.log('Load all the quiz');
        this._quiz.getActiveQuizzes().subscribe((data)=>{
          this.quizzes = data;
          console.log(this.quizzes);
          
        },(error) =>{
          console.log(error);
          alert("Error in loading all quizzes")
        });
        
      } else {
        console.log('Load specific quiz');
        this._quiz.getActiveQuizzesOfCategory(this.catId).subscribe((data)=>{
          this.quizzes = data;
        },(error)=>{
          console.log(error);
          alert("Error in loading quiz data from server")
          
        })
      }
    })
 
    
  }

}
