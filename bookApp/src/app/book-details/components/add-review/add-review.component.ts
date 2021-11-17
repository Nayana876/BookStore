import { getLocaleDateFormat, getLocaleDateTimeFormat } from '@angular/common';
import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/shared/toasts/services/toast.service';
import { UserService } from 'src/app/user/services/user.service';
// import { EventEmitter } from 'stream';
import { ReviewService } from '../../services/review.service';


@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent implements OnInit {

  reviewForm!: FormGroup;
  BId: any;
  today!: any;
  submitted: boolean=false;
  error:boolean=false;
  @Output() onSubmit=new EventEmitter<boolean>();

  constructor(private route: ActivatedRoute,private userService:UserService, private reviewService: ReviewService,private toastService:ToastService, private router: Router) {
    this.reviewForm = new FormGroup({
      UserId: new FormControl(this.userService.getUserId()),
      BookId: new FormControl(),
      Review1: new FormControl(null,Validators.maxLength(500)),
      Rating: new FormControl(0, Validators.compose([Validators.min(1), Validators.max(5)])),
      SubmittedAt:new FormControl()
    })
  }

  ngOnInit(): void {
    this.BId = this.route.snapshot.paramMap.get('id');
    console.log(this.route);

    this.today = new Date();
    var dd = String(this.today.getDate()).padStart(2, '0');
    var mm = String(this.today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = this.today.getFullYear();
    this.today = mm + '/' + dd + '/' + yyyy;
    console.log(this.today);

    this.reviewForm.controls['BookId'].setValue(this.BId);
    this.reviewForm.controls['SubmittedAt'].setValue(this.today);
    this.reviewForm.controls['Review1'].setValue('');
    this.reviewForm.controls['Rating'].setValue(0);
    this.submitted=false;
    this.error=false;
  }

  addReview() {
    console.log(this.reviewForm.value)
    
    this.reviewService.addReviewFun(this.reviewForm.value).subscribe(
      (res: any) => this.toastService.show("Review added",{classname:'bg-success text-light, delay 3000'}),
      (err: any) => {this.toastService.show("Error ",{classname:'bg-success text-light, delay 3000'}); this.error=true;}
  );
    this.submitted=true;
    
    setTimeout(() => {
      this.onSubmit.emit(true); 
      this.ngOnInit();
   }, 2000);
  }

}
