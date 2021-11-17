import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from 'src/app/book/services/book.service';
import { ToastService } from 'src/app/shared/toasts/services/toast.service';
import { UserService } from 'src/app/user/services/user.service';
import { ReviewService } from '../../services/review.service';

@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.css']
})
export class BookPageComponent implements OnInit {
  book: any;
  reviews: any;
  reviewList: any;
  rating = 0;
  clicked = false;

  constructor(private route: ActivatedRoute, 
    private bookService: BookService,
    private userService: UserService,
    private toastService:ToastService, 
    private reviewService: ReviewService) { }

  async ngOnInit(): Promise<void> {
    let BId = this.route.snapshot.paramMap.get('id');
    this.book = await this.bookService.getBookById(BId);
    // console.log(this.book)
    this.reviewList = await (await this.reviewService.getReviews()).filter((c: { BookId: string | null; Review1: string | null; }) => (c.BookId == BId && c.Review1 != null && c.Review1 != ""));
    // this.rating=this.book['BRating'];
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
