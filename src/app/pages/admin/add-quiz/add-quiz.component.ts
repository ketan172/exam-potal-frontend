import { QuizService } from './../../../services/quiz.service';
import { CategoryService } from './../../../services/category.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {


  categories=[];

  quizData ={
      title:'',
      description:'',
      maxMarks:'',
      numberOfQuestions:'',
      active: true,
      category: {
        cid:'',
      },
    }
 

  constructor(private _cat:CategoryService, private _snack:MatSnackBar, private _quiz:QuizService) { }

  ngOnInit(): void {
    this._cat.categories().subscribe((data:any)=>{
      this.categories = data;
      //console.log(this.categories);
      
    },(error)=>{
      console.log(error);
      Swal.fire("Error !!","Server Error !!","error");
    }) 
  }

  addQuiz() {
    if(this.quizData.title.trim() == ''  ||  this.quizData.title == null){
      this._snack.open("Title is required","",{
        duration:3000,
      });
      return ;
    }
    this._quiz.addQuiz(this.quizData).subscribe((data) =>{
      Swal.fire("Success","Quiz is added",'success')
      this.quizData ={
        title:'',
        description:'',
        maxMarks:'',
        numberOfQuestions:'',
        active: true,
        category: {
          cid:''
        },
      }
    },(error) =>{
      Swal.fire("Error !!","Error while adding quiz !!","error");
      console.log(error);
      
    })
  }

}
