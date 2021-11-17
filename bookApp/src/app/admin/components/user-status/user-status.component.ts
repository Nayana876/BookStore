import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AdminServicesService } from '../../Services/admin-services.service';

@Component({
  selector: 'app-user-status',
  templateUrl: './user-status.component.html',
  styleUrls: ['./user-status.component.css']
})
export class UserStatusComponent implements OnInit {
  errorBox = false;
  errorMessage = "";
  userFound  = false;
  userData: any ;
  thisComponentName = "User-Status";
  
  AnyOneFieldIsFilledValidation: ValidatorFn = 
  (control: AbstractControl) : ValidationErrors | null => {
   

    if(control.get('userName')?.value == "" && control.get('email')?.value == "" ){
    
      return {ErrorMessage : "Fill either UserName OR Email"}
    }

    else{
      this.errorBox = false;
      return null;
    }
  }
  
  findUserForm = new FormGroup({
    
    userName : new FormControl('', [ Validators.required]),
    email : new FormControl('', [ Validators.required, Validators.email]),
    },
    {
      validators: [this.AnyOneFieldIsFilledValidation]
    } );

  onSubmit(){
    if(this.findUserForm.errors?.ErrorMessage){
      this.errorBox = true;
      this.userFound = false;
      this.errorMessage = "Fill either UserName OR Email";
    }else if (this.findUserForm.get('email')?.errors?.email){
      this.errorBox = true;
      this.userFound = false;
      this.errorMessage = "Email Not Valid";
    }
    //Only going to service if all the errors does not exsist
    else{

        this.errorBox = false;

        this.adminServices.FindUserByUserNameOREmail(this.findUserForm.value.userName, this.findUserForm.value.email)
          .subscribe( (resp:any) => {
            console.log("Response from Backend inside User-st.TS -> ", resp);

        this.userFound = true;
        this.userData = resp;
        })
  
    }

  }
  ChangeUserStatusById(userData : any, status: string){
    userData.Status = status;
    this.adminServices.ChangeUserStatusById(userData.UId, userData)
      .subscribe( (res:any) => {
        console.log("response from backend inside user-st.TS after Status Chnage -> ", res);

        this.errorBox = false;
        this.userFound = true;
        this.userData = res;
      })

  }

  constructor(private adminServices : AdminServicesService) { }

  ngOnInit(): void {
  }

}
