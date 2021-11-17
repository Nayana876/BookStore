import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BookService } from 'src/app/shared/services/book.service';
// import { ToastService } from 'src/app/Shared/toasts/services/toast.service';
// import { ToastService } from 'src/app/Shared/toasts/services/toast.service';
import { UserService } from 'src/app/user/services/user.service';
// import { BookService } from 'src/app/shared/services/book.service';
import { ToastService } from 'src/app/shared/toasts/services/toast.service';
// import { UserService } from 'src/app/user/services/user.service';

@Component({
  selector: 'app-full-books-display',
  templateUrl: './full-books-display.component.html',
  styleUrls: ['./full-books-display.component.css']
})
export class FullBooksDisplayComponent implements OnInit {
  bookSubscription: Subscription | undefined = undefined;
  BookData: any[] = [];
  constructor(private bookServ: BookService, private userService: UserService, private toastService: ToastService) { }

  ngOnInit(): void {

    this.bookSubscription = this.bookServ.getAllBooks()
      .subscribe((res: any) => {
        this.BookData = res;
        console.log(this.BookData);
      });
  }


  addToCartBtn(id: number) {
    this.userService.addBookToCart(id)
      .subscribe(
        (res: any) => {
          console.log("Book added to cart.");
          this.toastService.show("Book added to cart.", { classname: 'bg-success text-light', delay: 3000 })
        },
        (err: any) => {
          if (err.status == 500) {
            this.toastService.show("Book already in cart.", { classname: 'bg-danger text-light', delay: 3000 })
          }
          else{
            this.toastService.show("Item already in cart.", { classname: 'bg-danger text-light', delay: 3000 })
          }
        }
      )
  }

  addToWishlistBtn(id: number) {
    this.userService.addBookToWishlist(id)
      .subscribe(
        (res: any) => {
          console.log("Book added to wishlist.");
          this.toastService.show("Book added to wishlist.", { classname: 'bg-success text-light', delay: 3000 })
        },
        (err: any) => {
          if (err.status == 500) {
            this.toastService.show("Book already in wishlist.", { classname: 'bg-danger text-light', delay: 3000 })
          }
          else{
            this.toastService.show("Item in wishlist.", { classname: 'bg-danger text-light', delay: 3000 })
          }
        }
      )
  }

}
