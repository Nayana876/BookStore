import { Injectable } from "@angular/core";
import { Book } from "./book.model";

interface IWishlist {
    WId: number,
    UId: number,
    Book: Book,
}

@Injectable({
    providedIn: 'root'
})
export class Wishlist implements IWishlist {
    WId!: number;
    UId!: number;
    Book!: Book;
}
