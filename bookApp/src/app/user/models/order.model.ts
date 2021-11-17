import { Injectable } from "@angular/core";
import { Address } from "./address.model";
import { Cart } from "./cart.model";

interface IOrder {
    OrderId: number | undefined,
    UserId: number,
    CartId: number,
    Cart: Cart,
    OrderPrice: number,
    OrderDate: Date,
    OrderStatus: number,
    Coins: number,
    Coupon: string,
    Show: boolean,
    Address: Address
}

@Injectable({
    providedIn: 'root'
})
export class Order implements IOrder {
    OrderId: number | undefined;
    UserId!: number;
    CartId!: number;
    Cart!: Cart;
    OrderPrice!: number;
    OrderDate!: Date;
    OrderStatus!: number;
    Coins!: number;
    Coupon!: string;
    Show: boolean = false;
    Address!: Address;
}
