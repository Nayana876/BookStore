import { Injectable } from "@angular/core";

interface IBook {
    BookId: number,
    CID: number,
    Title: string,
    Author: string,
    ISBN: string | undefined,
    BookYear: string | undefined,
    BRating: number | undefined,
    Quantity: number | undefined,
    Price: number,
    BDescri: string | undefined,
    BPosition: number | undefined,
    BStatus: string | undefined,
    BImgFile: string | undefined,
    BCondition: string | undefined,
    BTags: string | undefined,
}

@Injectable({
    providedIn: 'root'
})




export class Book implements IBook {
    BookId: number = 0;
    CID: number = 0;
    Title: string = '';
    Author: string = '';
    ISBN: string | undefined;
    BookYear: string | undefined;
    BRating: number | undefined;
    Quantity: number | undefined;
    Price: number = 0;
    BDescri: string | undefined;
    BPosition: number | undefined;
    BStatus: string | undefined;
    BImgFile: string | undefined;
    BCondition: string | undefined;
    BTags: string | undefined;
}

