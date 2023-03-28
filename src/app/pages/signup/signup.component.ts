import  Swal  from 'sweetalert2';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


  public user = {
    username:'',
    password:'',
    firstName:'',
    lastName:'',
    email:'',
    phone:'', 
  };


  constructor(private userService:UserService,private snack:MatSnackBar) { }

  ngOnInit(): void {}

  formSubmit() {
    // alert('submit');
    console.log(this.user);
    if(this.user.username == '' || this.user.username == null) {
      // alert('Username is required');
      this.snack.open("Username is required !! ",'',{
        duration:3000,
        // verticalPosition: 'top',
        // horizontalPosition: 'right'
      });
      return;
    }
    //validate user


    //addUser: UserService
    this.userService.addUser(this.user).subscribe((data:any) =>{
      //success
      console.log(data);
      // alert('success');
      Swal.fire('Successfully done !!','User id is '+ data.id,'success');

    }, (error) =>{
      //error
      console.log(error);
      alert('Something went wrong');
      this.snack.open('Something went wrong !!','',{
        duration: 3000,
      })

    })
  }




}
