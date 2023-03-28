import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from './../../../services/category.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  categories;
  constructor(private _cat:CategoryService,private _snack:MatSnackBar) { }

  ngOnInit(): void {
    this._cat.categories().subscribe((data)=>{
      this.categories = data;
    },(error) =>{
      this._snack.open("Erorr in loading categories from server","",{
        duration:3000,
      });
    });
  }

}
