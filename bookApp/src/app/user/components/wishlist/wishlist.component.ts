import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastService } from 'src/app/shared/toasts/services/toast.service';
// import { ToastService } from 'src/app/shared/toasts/services/toast.service';
import { Wishlist } from '../../models/wishlist.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  wishlist!: Wishlist[];
  wishlistSubscription: Subscription | undefined = undefined;
  constructor(private userService: UserService, private toastService: ToastService) { }

  removeBtnClick(id: number) {
    this.userService.removeFromWishlist(id)
      .subscribe((res: any) => {
        this.wishlistSubscription = this.userService.getUserDetails()
          .subscribe((res: any) => {
            this.wishlist = res.Wishlists;
            console.log(this.wishlist);
          })
      }
      )
  }

  addBookToCart(id: number, wid: number) {
    this.userService.addBookToCart(id)
      .subscribe((res: any) => {
        this.removeBtnClick(wid);
        this.toastService.show("Book added to cart.", { classname: "bg-success text-light", delay: 3000 });
      },
        (err: any) => {
          if (err.status == 500)
            this.toastService.show("Book already in cart.", { classname: "bg-danger text-light", delay: 3000 });
          else
            this.toastService.show("Error adding book to cart.", { classname: "bg-danger text-light", delay: 3000 });
          console.error(err);

        }
      )
  }

  ngOnInit(): void {
    this.wishlistSubscription = this.userService.getUserDetails()
      .subscribe((res: any) => {
        this.wishlist = res.Wishlists;
        console.log(this.wishlist);
      })
  }

}
