import { Component, OnInit } from '@angular/core';
import { ControlContainer, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/shared/toasts/services/toast.service';
import { CouponService } from '../../services/coupon.service';

@Component({
  selector: 'app-edit-coupon',
  templateUrl: './edit-coupon.component.html',
  styles: [
    `.form-group{
      padding:5px;
    }`
  ]
})
export class EditCouponComponent implements OnInit {
  public coupon:any
  editCouponForm=new FormGroup({
    'CouponId' :new FormControl(null),
    'DiscountPercentage':new FormControl(null,Validators.min(0)),
    'MaximumDiscount' :new FormControl(null,Validators.min(0)),
    'MinimumOrderPrice': new FormControl(null,Validators.min(0)),
    'Expiry' :new FormControl(null)

  });
  constructor(private couponService:CouponService,private route:ActivatedRoute,private toastService:ToastService, private router: Router) { }

  async ngOnInit(): Promise<void> {
    let cId = this.route.snapshot.paramMap.get('id');
    this.coupon=await this.couponService.getCouponById(cId);
    
    this.editCouponForm.setValue({
      'CouponId' :this.coupon['CouponId'],
      'DiscountPercentage':this.coupon['DiscountPercentage'],
      'MaximumDiscount' :this.coupon['MaximumDiscount'],
      'MinimumOrderPrice':this.coupon['MinimumOrderPrice'],
      'Expiry' :this.coupon['Expiry'].substring(0,10)
  
    });
  }
  editCoupon(){
    console.log(this.editCouponForm.value);
    this.couponService.updateCoupon(this.editCouponForm.value,this.router).subscribe(
      (res: any) => this.toastService.show("Coupon updated..!",{classname:'bg-success text-light, delay 3000'}),
      (err: any) => {this.toastService.show("Error ",{classname:'bg-success text-light, delay 3000'});},
      ()=>this.router.navigateByUrl('coupon')
  );
  }
}
