import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BookSubmissionServiceService } from '../book-submission-service.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  addCategoryForm = new FormGroup({
    'BSId' : new FormControl(),
    'Author' : new FormControl(),
    'Title' : new FormControl(),
    'Description' : new FormControl(),
    'UserName' : new FormControl(),
    'Condition' : new FormControl(),
    'ReviewStatus' : new FormControl(),
    'UId' : new FormControl()
     
  });

  BsId : any;
  BookSubmission : any;
  failedUpdate = false;
  successUpdate = false;
  errorMessage = "";
  

  constructor(private route:ActivatedRoute , private BsService : BookSubmissionServiceService) { 
    this.route.queryParams.subscribe( params => {
      this.BookSubmission = JSON.parse(params.BookSubmission);
      console.log("Data recieved in eidt page thru navigation prop -> ", this.BookSubmission);
    })
  }

  ngOnInit(): void {
    this.addCategoryForm = new FormGroup({
      'BSId' : new FormControl(this.BookSubmission.BSId),
      'Author' : new FormControl(this.BookSubmission.Author,[ Validators.required]),
      'Title' : new FormControl(this.BookSubmission.Title,[ Validators.required]),
      'Description' : new FormControl(this.BookSubmission.Description,[ Validators.required]),
      'UserName' : new FormControl(this.BookSubmission.UserInfo.UserName,[ Validators.required]),
      'Condition' : new FormControl(this.BookSubmission.Condition,[ Validators.required]),
      'ReviewStatus' : new FormControl(this.BookSubmission.ReviewStatus),
      'UId' : new FormControl(this.BookSubmission.UId)
       
    });

  }

  onSubmit(){
    
    this.BsService.UpdateSubmission(this.addCategoryForm.get("BSId")?.value, this.addCategoryForm.value)
      .subscribe( (res:any) => {
        console.log("Updated Book Submission recieved in ts -> ", res);
        
        this.failedUpdate = false;
        this.successUpdate = true;
        this.BookSubmission = res;
      },
      (error) => {
        console.log("error here in TS of edit order -> ", error);
        this.successUpdate = false;
        this.failedUpdate = true;
        this.errorMessage = error;
      })
  }

}
