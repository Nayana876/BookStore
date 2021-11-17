import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TestimonialService } from 'src/app/testimonial.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.css']
})
export class TestimonialComponent implements OnInit {
  testSubscription: Subscription | undefined = undefined;
  testData:any[]=[];
  threeData:any[]=[];
  testimonialForm!:FormGroup

  
  show:boolean=false;
  today: any;
  error:boolean=false;
  


  constructor(private testServ:TestimonialService) {
    this.testimonialForm = new FormGroup(
      {Name:new FormControl(null,Validators.required),
        Review:new FormControl(null,Validators.required),
        SubmittedAt:new FormControl()}
    )
   }

  ngOnInit(): void {

    this.testSubscription = this.testServ.getTestimonials()
    //3. get the response from the service
    .subscribe((res:any) => {
      console.log(res);
      this.testData=res;
      this.threeData=res.slice(0,3);
      
      });

      this.today = new Date();
      var dd = String(this.today.getDate()).padStart(2, '0');
      var mm = String(this.today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = this.today.getFullYear();
      this.today = mm + '/' + dd + '/' + yyyy;
      this.testimonialForm.controls['SubmittedAt'].setValue(this.today);
      
 }

 addTestimonial():void{
   this.error=false;
  if((this.testimonialForm.controls['Name'].value==null) || (this.testimonialForm.controls['Review'].value==null)){
    this.error=true;
  }
  else{
  this.testServ.addTest(this.testimonialForm.value)
  .subscribe((data: any)=> {
    console.log(data);
       
  })  
  this.testimonialForm.controls['Review'].reset();
  this.testimonialForm.controls['Name'].reset();
                this.show=false;
                this.error=false;
                alert("We value your comment!!Thanks for submitting");
 }
}

 ShowForm():void
 {
   this.show=true;
 }

}
