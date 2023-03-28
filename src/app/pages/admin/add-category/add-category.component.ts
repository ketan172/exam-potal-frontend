import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from './../../../services/category.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {


  category = {
    title:'',
    description:''
  };

  constructor(private _category:CategoryService, private _snack:MatSnackBar) { }

  ngOnInit(): void {
  }

  formSubmit() {
    if(this.category.title.trim() == '' || this.category.title == null)
    {
      console.log('hi');
      
      this._snack.open('Title Required !!','',{
        duration:3000,
      });
      return ;
    } else {
    this._category.addCategory(this.category).subscribe((data:any) =>{
        this.category.title='';
        this.category.description='';
        Swal.fire("Success !!","Category is added Successfully","success")
    }, (error) =>{
      console.log(error);
      Swal.fire("Error !!","Server Error !!","error")
    }) }
  }

}
