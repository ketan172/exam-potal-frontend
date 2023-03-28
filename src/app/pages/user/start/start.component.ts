import { QuestionService } from './../../../services/question.service';
import { ActivatedRoute } from '@angular/router';
import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {


  qid;
  questions;

  marksGot = 0 ;
  correctAnswers = 0;
  attempted = 0;

  isSubmit=false;

  timer:any ;

  constructor(private locationSt: LocationStrategy, private _route:ActivatedRoute, private _question:QuestionService) { }

  ngOnInit(): void {
    this.preventBackButton();
    this.qid = this._route.snapshot.params.qid;
    this.loadQuestions();

  }

  loadQuestions() {
    this._question.getQuestionsOfQuizForTest(this.qid).subscribe((data)=>{
      this.questions = data;
      this.timer = this.questions.length*2*60;
      // field will be added from the backend
      // this.questions.forEach((q)=>{
      //   q['givenAnswer'] = '';
      // })
      console.log(data);
      this.startTimer();
      
    },(error)=>{
      console.log(error);
      Swal.fire("Error !!","Error in geting questions from the server","error");
      
    })
  }

  preventBackButton(){
    history.pushState(null,null,location.href);
    this.locationSt.onPopState(()=>{
      history.pushState(null,null,location.href);
    })
  }

  submitQuiz(){
    Swal.fire({
      title:'Do you want to submit the quiz',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      icon: 'info'
    }).then((e)=>{
        if(e.isConfirmed){
         this.evalQuiz();
          
        }
     })

  }

  startTimer(){
    let t:any =window.setInterval(()=>{
      //code will called in 1 sec interval
      if(this.timer<=0){
        this.evalQuiz();
        clearInterval(t);
      }else {
        this.timer--;
      }
    },1000)
  }

  getFormatedTime(){
    let mm=Math.floor(this.timer/60);
    let ss=this.timer - mm*60
    return `${mm} min : ${ss} sec`;
  }

  evalQuiz(){
     //calculation
     //call to server to evaluate quiz
      this._question.evalQuiz(this.questions).subscribe((data:any)=>{
        console.log(data);
        this.marksGot = parseFloat(Number(data.marksGot).toFixed(2));
        this.correctAnswers = data.correctAnswers;
        this.attempted = data.attempted;
        this.isSubmit=true;
      }, (error)=>{
        console.log(error);
        
      })
    //  this.isSubmit=true;

    //  this.questions.forEach( (q)=>{
    //    if(q.givenAnswer == q.answer){
    //      this.correctAnswers++;
    //      let marksSingle = this.questions[0].quiz.maxMarks/this.questions.length;
    //      this.marksGot += marksSingle;
    //    }
    //    if(q.givenAnswer.trim() != '') {
    //      this.attempted++;
    //    }
    //  });

    //  console.log("Correct Answer:" + this.correctAnswers);
    //  console.log("Marks Got:" + this.marksGot);
    //  console.log("Attempted" + this.attempted);
     
    //  console.log(this.questions);
  }

  printPage(){
    window.print();
  }
}
