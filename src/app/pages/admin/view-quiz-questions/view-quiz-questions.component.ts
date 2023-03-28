import { QuestionService } from './../../../services/question.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit {

  qId;
  qTitle;
  questions= [];
  constructor(private _route:ActivatedRoute, private _question:QuestionService) { }

  ngOnInit(): void {
   this.qId = this._route.snapshot.params.qid;
   this.qTitle = this._route.snapshot.params.title;
  //  console.log(this.qId);
  //  console.log(this.qTitle);
   this._question.getQuestionsOfQuiz(this.qId).subscribe((data:any)=>{
      console.log(data);
      this.questions = data;
      
   },(error)=>{
      console.log(error );
      
   })
   
  }



  deleteQuestion(qid) {
    Swal.fire({
      icon:`info`,
      title:"Are you sure you want to delete the Question?",
      confirmButtonText:"Delete",
      showCancelButton:true
    }).then((result) =>{
      if(result.isConfirmed){
        this._question.deleteQuestion(qid).subscribe((data) =>{
            
            this.questions=this.questions.filter((question) => question.quesId!=qid);
            Swal.fire("Success","Question Deleted","success");
        
          },(error)=>{
        
            Swal.fire("Error !!","Error in deleting question","error");
        
          });
      }
    })
  }

}
