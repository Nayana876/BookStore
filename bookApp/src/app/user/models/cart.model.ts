import { Injectable } from "@angular/core";
import { CartItem } from "./cart-item.model";

interface ICart {
    CartProducts: CartItem[],
    CartId: number,
    TotalPrice: number
}

@Injectable({
    providedIn: 'root'
})
export class Cart implements ICart {
    CartProducts: CartItem[] = [];
    CartId: number = 0;
    TotalPrice: number = 0;
}
