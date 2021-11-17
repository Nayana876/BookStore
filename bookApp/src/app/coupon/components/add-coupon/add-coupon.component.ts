import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/shared/toasts/services/toast.service';
import { CouponService } from '../../services/coupon.service';

@Component({
  selector: 'app-add-coupon',
  templateUrl: './add-coupon.component.html',
  styleUrls: ['./add-coupon.component.css']
})
export class AddCouponComponent implements OnInit {
  public couponData:any;
  submitted: boolean = false;
  addCouponForm=new FormGroup({
    'CouponId' :new FormControl(null,Validators.required),
    'DiscountPercentage':new FormControl(null,Validators.compose([Validators.required,Validators.min(0)])),
    'MaximumDiscount' :new FormControl(null,Validators.compose([Validators.required,Validators.min(0)])),
    'MinimumOrderPrice': new FormControl(null,Validators.compose([Validators.required,Validators.min(0)])),
    'Expiry' :new FormControl(null,Validators.required)

  });
  constructor(private couponService:CouponService,private router:Router,private toastService:ToastService) { }

  ngOnInit(): void {
    this.addCouponForm=new FormGroup({
      'CouponId' :new FormControl(null,Validators.required),
      'DiscountPercentage':new FormControl(null,Validators.compose([Validators.required,Validators.min(1)])),
      'MaximumDiscount' :new FormControl(0,Validators.compose([Validators.min(0)])),
      'MinimumOrderPrice': new FormControl(0,Validators.compose([Validators.min(0)])),
      'Expiry' :new FormControl(null,Validators.required)
  
    });
  }
  addCoupon(){
    this.submitted=true;
    if(this.addCouponForm.valid){
      this.couponService.addCouponFun(this.addCouponForm.value,this.router).subscribe(
        (res: any) => this.toastService.show("Coupon Addedd..!",{classname:'bg-success text-light, delay 3000'}),
        (err: any) => {this.toastService.show("This coupon ID exists ",{classname:'bg-danger text-light, delay 3000'});},
        ()=>this.router.navigateByUrl('coupon')
    );
    }
    
  }
}
