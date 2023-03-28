import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user=null;
  constructor(private login:LoginService) { }

  ngOnInit(): void {
    //get userdata from local storage
    this.user = this.login.getUser();
    
    //get userdata from server 
    // this.login.getCurrentUser().subscribe(
    //   (user:any) =>{
    //     this.user = user;
    //   },
    //   (error)=>{
    //     alert("ERROR");
    //   }
    // )
  }


}
