import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/shared/toasts/services/toast.service';
import { CouponService } from '../../services/coupon.service';

@Component({
  selector: 'app-coupon-home',
  templateUrl: './coupon-home.component.html',
  styles: [
  ]
})
export class CouponHomeComponent implements OnInit {
  coupons: any[]=[];
  coupon:any|undefined;
  constructor(private CouponServices:CouponService,private toastService :ToastService) { }

  ngOnInit(): void {
    this.allCoupons();
  }
  allCoupons(){
    this.CouponServices.getCoupons().subscribe(data=>{
      this.coupons=data;
    })
  }
  deleteCoupon(id: any){
    this.CouponServices.deleteCouponById(id).subscribe(
      (res: any) => this.toastService.show("Coupon deleted..!",{classname:'bg-success text-light, delay 3000'}),
      (err: any) => {this.toastService.show("Error ",{classname:'bg-success text-light, delay 3000'});},
    
  );
    }
}
