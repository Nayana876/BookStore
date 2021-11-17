import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl , Validators, ValidatorFn, AbstractControl, ValidationErrors, Validator} from '@angular/forms';
import { AuthServicesService } from '../../auth-services.service';
import { ICreateUser } from "../../userInterfaces";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  failedSignIn = false;
  successSignIn = false;
  errorMessage = "";
  passwordNotSame = false;


  equalPasswordValidation: ValidatorFn = 
  (control: AbstractControl) : ValidationErrors | null =>{
    
    let confirmPassword = control.get('confirmPassword')?.value;
    let password = control.get('password')?.value;
 
    if(confirmPassword === password){
      this.passwordNotSame= false;
      return null;
    }
    else{
      this.passwordNotSame= true;
      return {passwordNotSameMessage : "Passwords Do NOT Match"};
    }
        

  }


  signInForm = new FormGroup({
    
    fullName : new FormControl('', [ Validators.required]),
    userName : new FormControl('', [ Validators.required]),
    email : new FormControl('', [ Validators.required, Validators.email]),
    password : new FormControl('', [ Validators.required]),
    confirmPassword : new FormControl('', [ Validators.required])
    }, 
    {
      validators: [this.equalPasswordValidation] //For cross field validation
    });

  

  onSubmit(){
    //console.log("Form data -> : ", this.signInForm.value);
    console.log("SignInForm Errors => ", this.signInForm.errors);
    const FullName =  this.signInForm.value.fullName.split(' '); //splitting by spaces to make an array
   
    const userData : ICreateUser = {
      fname: FullName[0],
      lname: FullName.slice(1,).join(" "),
      email: this.signInForm.value.email,
      username: this.signInForm.value.userName,
      password: this.signInForm.value.password
    }

    this.authService.createUser(userData)
      .subscribe( (res:any) =>{
        console.log("Response from Auth Service to SigninComponent Ts -> ", res);
        this.failedSignIn = false;
        this.successSignIn = true;
      },
      error => {
        if(error === "Email Already Exsists"){
          console.log("Email Already Exisits ", error);
          this.failedSignIn=true;
          this.errorMessage = "Email already Exisits";
        }
        else if((error === "UserName Already Exsists")){
          console.log("UserName Already Exsists", error);
          this.failedSignIn=true;
          this.errorMessage = "UserName Already Exsists";
        }
        else{
          console.log("ERROR -> (in signinTS", error);
          this.failedSignIn=true;
          this.errorMessage = "Sign In Failed!";
        }
      })
    
  }

  constructor(private authService : AuthServicesService) { }

  ngOnInit(): void {
  }

}
