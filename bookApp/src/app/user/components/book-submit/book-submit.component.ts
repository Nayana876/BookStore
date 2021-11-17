import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BookSubmissionServiceService } from 'src/app/admin/book-submission/book-submission-service.service';
import { ToastService } from 'src/app/shared/toasts/services/toast.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-book-submit',
  templateUrl: './book-submit.component.html',
  styleUrls: ['./book-submit.component.css']
})
export class BookSubmitComponent implements OnInit {


  addCategoryForm = new FormGroup({
    'Author': new FormControl("", Validators.required),
    'Title': new FormControl("", Validators.required),
    'Description': new FormControl("", Validators.required),
    'Condition': new FormControl("", Validators.required),
    'ReviewStatus': new FormControl('Under Review'),
    'UId': new FormControl(this.userService.getUserId())
  });

  BsId: any;
  BookSubmission: any;
  failedUpdate = false;
  successUpdate = false;
  errorMessage = "";


  constructor(private bookSubmissionService: BookSubmissionServiceService, private userService: UserService, private toastService: ToastService) {

  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.bookSubmissionService.addSubmission(this.addCategoryForm.value)
      .subscribe((res: any) => {
        this.addCategoryForm.setValue({
          'Author': "",
          'Title': "",
          'Description': "",
          'Condition': "",
          'ReviewStatus': 'Under Review',
          'UId': this.userService.getUserId()
        })

        this.toastService.show("Submitted book for review.",  { classname: 'bg-success text-light', delay: 3000 });
      },
        (error) => {
          console.log("error here in TS of edit order -> ", error);
          this.toastService.show("Error submitting book.",  { classname: 'bg-danger text-light', delay: 3000 });
       
          this.successUpdate = false;
          this.failedUpdate = true;
          this.errorMessage = error;
        })
  }


}
