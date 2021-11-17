import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, Routes } from '@angular/router';
import { CouponHomeComponent } from './components/coupon-home/coupon-home.component';
import { AddCouponComponent } from './components/add-coupon/add-coupon.component';
import { EditCouponComponent } from './components/edit-coupon/edit-coupon.component';

const couponRoutes:Routes = [
  {path: '', component: CouponHomeComponent},
  {path: 'add', component: AddCouponComponent},
  {path: ':id', component:EditCouponComponent},
  
  ]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(couponRoutes)
  ],
  exports:[
    RouterModule
  ]
})
export class CouponRoutingModule { }
