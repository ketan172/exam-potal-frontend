import { QuizService } from './../../../services/quiz.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {

  qid;
  quiz;

  constructor(private _route:ActivatedRoute, private _quiz:QuizService, private _router: Router) { }

  ngOnInit(): void {
    this.qid = this._route.snapshot.params.qid;
    this._quiz.getQuiz(this.qid).subscribe((data)=>{
      this.quiz = data;
    },(error)=>{
      console.log(error);
      alert('Error in loading Quiz Data')
    })
  }

  startQuiz(){
    Swal.fire({
      title:'Do you want to start the quiz',
      showCancelButton: true,
      confirmButtonText: 'Start',
      icon: 'info'
    }).then((result)=>{
      if(result.isConfirmed){
        this._router.navigate(['/start/'+this.qid]);
        Swal.fire('','','success');
      } else if(result.isDenied) {
        Swal.fire('','','info');
      }
    })
  }

}
