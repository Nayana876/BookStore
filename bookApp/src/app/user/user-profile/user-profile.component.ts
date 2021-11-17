import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/shared/toasts/services/toast.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styles: [
  ]
})
export class UserProfileComponent implements OnInit {
  formData: FormData = new FormData();
  userForm: any;
  imageUrl: string = "https://localhost:44390/Images/"
  // "data:image/png;base64,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";
  user: any;
  submitted:boolean=false;
  selectedFile!: File;

  constructor(private userService: UserService,private toastService:ToastService) {
    this.userForm = new FormGroup({
      FName: new FormControl('', Validators.maxLength(50)),
      LName: new FormControl('', Validators.maxLength(50)),
      Password: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      PhoneNo: new FormControl('', [Validators.maxLength(10), Validators.pattern("[0-9]{10}"),Validators.required]),
      Coins: new FormControl(),
      Pic:new FormControl()
    })
  }

  ngOnInit(): void {
    this.userService.getUserDetails().subscribe((data: any) => {
      this.user = data;
      console.log(data.Email);
      this.userForm.setValue({
        FName: data.FName,
        LName: data.LName,
        Password: data.Password,
        PhoneNo: data.PhoneNo,
        Coins: data.Coins,
        Pic:data.ProfilePic
      }
      )
      this.imageUrl+=data.ProfilePic;
      console.log(this.imageUrl)
    });

  }
  handleImgUpl(event: any) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
    var reader = new FileReader();
    reader.onload = ((event: any) => {
      this.imageUrl = event.target.result;
    })
    reader.readAsDataURL(this.selectedFile);

  }
  async updateProfile() {
    this.submitted = true;

    this.formData.append('Image', this.selectedFile);
    for (const field in this.userForm.controls) {
      console.log(field, this.userForm.get(field)?.value);
      this.formData.append(field, this.userForm.get(field)?.value);
    }
    if (this.userForm.valid) {
      this.userService.updateUser(this.formData,this.userForm.value).subscribe(
        res => { this.toastService.show("User updated..!", { classname: 'bg-success text-light, delay 3000' });  },
        err => { this.toastService.show("Error", { classname: 'bg-danger text-light, delay 3000' }); },
      );
    }

  }
}
