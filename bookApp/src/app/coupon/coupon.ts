import { Injectable } from "@angular/core";

interface ICoupon{
    CouponId: string;
    DiscountPercentage: Float32Array;
    MaximumDiscount:Float32Array;
    MinimumOrderPrice: Float32Array;
    Expiry:Date;

}
@Injectable({
    providedIn: 'root'
  })
export class Coupon implements ICoupon{
    CouponId!: string;
    DiscountPercentage!: Float32Array;
    MaximumDiscount!: Float32Array;
    MinimumOrderPrice!: Float32Array;
    Expiry!: Date;
   

}