import { Injectable } from "@angular/core";
import { Book } from "./book.model";

interface IcartItem {
    Book: Book,
    CPId: number,
    Quantity: number
}


@Injectable({
    providedIn: 'root'
})
export class CartItem implements IcartItem {
    Book: Book = new Book();
    CPId: number = 0;
    Quantity: number = 0;
}
