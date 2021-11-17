import { Injectable } from "@angular/core";

interface ICoupon{
    CouponId: string,
    DiscountPercentage: number,
    MaximumDiscount: number,
    MinimumOrderPrice: number,
    Exipry: Date
}

@Injectable({
    providedIn: "root"
})
export class Coupon implements ICoupon {
    CouponId!: string;
    DiscountPercentage!: number;
    MaximumDiscount!: number;
    MinimumOrderPrice!: number;
    Exipry!: Date;
}
