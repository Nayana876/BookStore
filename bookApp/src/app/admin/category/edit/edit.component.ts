import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  addCategoryForm = new FormGroup({
    'CategoryId' : new FormControl(),
    'CName' : new FormControl(),
    'BCount' : new FormControl(),
    'CDescri' : new FormControl(),
    'CStatus' : new FormControl(),
    'CPosition' : new FormControl(),
    'CreatedAt' : new FormControl(),
    
  });
  CategoryId : any;
  category : any;
  failedUpdate = false;
  successUpdate = false;
  errorMessage = "";
  StatusOptions = ['Unavailable', 'Available'];
  
  constructor(private route:ActivatedRoute ,private catService : ServiceService) { }

  ngOnInit(): void {
    this.CategoryId = this.route.snapshot.paramMap.get('id');
    this.catService.getCategoryByid(this.CategoryId)
      .subscribe( (res:any) => {
        console.log("Response of given Category - > ", res);
        this.category = res;

        this.addCategoryForm = new FormGroup({
          'CategoryId' : new FormControl(this.category.CategoryId),
          'CName' : new FormControl(this.category.CName, [ Validators.required]),
          'BCount' : new FormControl(this.category.BCount, [ Validators.required]),
          'CDescri' : new FormControl(this.category.CDescri, [ Validators.required]),
          'CStatus' : new FormControl(this.category.CStatus, [ Validators.required]),
          'CPosition' : new FormControl(this.category.CPosition, [ Validators.required, Validators.pattern('S[0-9][0-9][0-9]C[0-9][0-9]NO[0-9][0-9]')]),
          'CreatedAt' : new FormControl('12/22/2020', [ Validators.required,  Validators.pattern('[0-1][0-9]/[0-3][0-9]/[0-2][0-9][0-9][0-9]')]),
      })
  });

}
onSubmit(){
  this.catService.updateCategory(this.CategoryId, this.addCategoryForm.value)
  .subscribe( (res:any) => {
    console.log("Updated Category recived = ", res)
    this.failedUpdate = false;
    this.successUpdate = true;
    this.category = res;

   
    
    
  },
  (error:string) => {
    console.log("error here in TS of edit order -> ", error);
    this.successUpdate = false;
    this.failedUpdate = true;
  })
}
}
