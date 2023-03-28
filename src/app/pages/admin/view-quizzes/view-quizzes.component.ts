import { QuizService } from './../../../services/quiz.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {


  quizzes= [];
  @ViewChild(MatPaginator) paginator:MatPaginator;

  constructor(private _quiz:QuizService) { }

  ngOnInit(): void {
    this._quiz.quizzes().subscribe((data:any) =>{
      this.quizzes = data;
      // this.quizzes. = this.paginator;
      console.log(this.quizzes);
    },(error)=>{
      console.log(error);
      Swal.fire("Error !!","Error in loading data","error");
    })
  }

  // deleteQuiz(qId){
  //  this._quiz.deleteQuiz(qId).subscribe((data) =>{
    
  //   this.quizzes=this.quizzes.filter((quiz) => quiz.qId!=qId);
  //   Swal.fire("Success","Quiz Deleted","success");

  // },(error)=>{

  //   Swal.fire("Error !!","Error in deleting quiz","error");

  // });
  // }

  deleteQuiz(qId) {
    Swal.fire({
      icon:`info`,
      title:"Are you sure you want to delete the Quiz?",
      confirmButtonText:"Delete",
      showCancelButton:true
    }).then((result) =>{
      if(result.isConfirmed){
        this._quiz.deleteQuiz(qId).subscribe((data) =>{
            
            this.quizzes=this.quizzes.filter((quiz) => quiz.qId!=qId);
            Swal.fire("Success","Quiz Deleted","success");
        
          },(error)=>{
        
            Swal.fire("Error !!","Error in deleting quiz","error");
        
          });
      }
    })
  }

}
