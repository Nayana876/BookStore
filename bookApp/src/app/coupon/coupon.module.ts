import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CouponRoutingModule } from './coupon-routing.module';
import { AddCouponComponent } from './components/add-coupon/add-coupon.component';
import { CouponHomeComponent } from './components/coupon-home/coupon-home.component';
import {  ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EditCouponComponent } from './components/edit-coupon/edit-coupon.component';



@NgModule({
  declarations: [
    AddCouponComponent,
    CouponHomeComponent,
    EditCouponComponent
  ],
  imports: [
    CommonModule,
    CouponRoutingModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class CouponModule { }
