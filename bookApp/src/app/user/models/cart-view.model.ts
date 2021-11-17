import { Injectable } from "@angular/core";

interface IcartView {
    CartId: number,
    Title: string,
    Price: number,
    Quantity: number,
    Author: string
}


@Injectable({
    providedIn: 'root'
})
export class CartView implements IcartView {
    CartId: number = 0;
    Title: string = '';
    Price: number = 0;
    Quantity: number = 0;
    Author: string = '';
}
