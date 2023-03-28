import { QuestionService } from './../../../services/question.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css']
})
export class UpdateQuestionComponent implements OnInit {

  quesId;
  question;

  constructor(private _route:ActivatedRoute,private _question:QuestionService,private _router:Router) { }

  ngOnInit(): void {
    this.quesId = this._route.snapshot.params.quesId;
    console.log(this.quesId);

    this._question.getSingleQuestion(this.quesId).subscribe((data)=>{
      this.question = data;
      console.log(this.question);
      
    },(error)=>{
      console.log(error);
      
    });
    
  }

  public updateQuestion(){
    //validate 

    this._question.updateQuestion(this.question).subscribe((data) =>{
      Swal.fire("Success !! ","Question Updated","success").then((e)=>{
        this._router.navigate(['/admin/view-questions/'+ this.question.quiz.qId + '/' + this.question.quiz.title]);
      });
    },(error) =>{
      Swal.fire("Error","Error in Updating Question","error");
    })
  }

}
