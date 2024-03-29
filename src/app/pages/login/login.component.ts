import { Router } from '@angular/router';
import { LoginService } from './../../services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData = {
    username: '',
    password: '',
  };
 
  constructor(private snack: MatSnackBar, private login:LoginService,private router:Router) { }

  ngOnInit(): void {
  }

  formSubmit() {
    console.log('Login Button Clicked');
    if(this.loginData.username.trim()== '' || this.loginData.username == null) {
       this.snack.open("Username is required !!",'',{
        duration: 3000,
       });
       return ;
    }
    if(this.loginData.password.trim()== '' || this.loginData.password == null) {
      this.snack.open("Password is required !!",'',{
       duration: 3000,
      });
      return ;
   }

   //request to server to generate token
   this.login.generateToken(this.loginData).subscribe(
    (data:any) =>{
      console.log('Success');
      console.log(data);

      //login...
      this.login.loginUser(data.token);
      this.login.getCurrentUser().subscribe(
        (user:any) =>{
          this.login.setUser(user);
          console.log(user);

          //redirect  ...ADMIN: admin-dashboard
          //redirect ...NORMAL: noraml-dashboard 

          if(this.login.getUserRole() == 'ADMIN')
          {
            this.router.navigate(['admin']);
            this.login.loginStatusSubject.next(true);
            //window.location.href='/admin'

          } else if(this.login.getUserRole() == 'NORMAL') {
            
           // window.location.href='/user-dashboard'
           this.router.navigate(['user-dashboard/0']);
           this.login.loginStatusSubject.next(true);

          } else {

            this.login.logout();
            //location.reload();

          }
          
        }
      )
    },
    (error ) =>{
      console.log('Error !');
      console.log(error);
      this.snack.open("Invalid Details !! Try Again","",{
        duration: 3000,
      });
    }
   )
  }
 
}
