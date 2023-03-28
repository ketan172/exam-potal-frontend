import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from './../../../services/category.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {


  categories = [
    
  ];

  constructor(private _category :CategoryService, private snack:MatSnackBar) { 
    this._category.categories().subscribe((data:any) =>{
      this.categories = data;
      console.log(data);
    },(error) =>{
      console.log(error);
      Swal.fire("Error !!","Error in loading data","error");
    })
  }

  ngOnInit(): void {
  }


  deleteCategory(cid) {
    Swal.fire({
      icon:`info`,
      title:"Are you sure you want to delete the Category?",
      confirmButtonText:"Delete",
      showCancelButton:true
    }).then((result) =>{
      if(result.isConfirmed){
    this._category.deleteCategory(cid).subscribe((data) =>{
     
     this.categories=this.categories.filter((category) =>category.cid!=cid);
     Swal.fire("Success","Category Deleted","success");
 
   },(error)=>{
 
     Swal.fire("Error !!","Error in deleting category","error");
 
   });
  }
})
}
  
  
  

}
