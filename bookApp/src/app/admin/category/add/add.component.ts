import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  errorMessage = "";
  failedSignIn = false;
  successSignIn = false;
  StatusOptions = ['Unavailable', 'Available'];
  addCategoryForm = new FormGroup({
    
    CName : new FormControl('Fiction', [ Validators.required]),
    BCount : new FormControl('0', [ Validators.required]),
    CDescri :  new FormControl('Some Random Desc', ),
    CStatus : new FormControl(this.StatusOptions[0], [ Validators.required, ]),
    CPosition : new FormControl('0', [ Validators.required, Validators.pattern('[0-9]*')]),
    CreatedAt : new FormControl('12/22/2020', [ Validators.required,  Validators.pattern('[0-1][0-9]/[0-3][0-9]/[0-2][0-9][0-9][0-9]')]),
    
    });

    onSubmit(){
      this.catService.addCategory(this.addCategoryForm.value)
      .subscribe( (res:any) => {
      console.log("Form Value - > ", this.addCategoryForm.value)
        
          console.log("Res from backedn in ts of add category -> ", res);
          this.failedSignIn = false;
          this.successSignIn = true;
        })
    }
    
  constructor(private catService: ServiceService) { }

  ngOnInit(): void {
  }

}
