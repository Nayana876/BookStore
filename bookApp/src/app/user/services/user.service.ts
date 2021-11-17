import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cart } from '../models/cart.model';
import { CartItem } from '../models/cart-item.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private REST_API_URL_BASE = "https://localhost:44390/api/";

  constructor(private http: HttpClient) { }

  getUserId(): string | null {
    return sessionStorage.getItem("UserId");
  }
  
  getUserCartId(): string | null {
    let cartId = sessionStorage.getItem('CartId');
    if (cartId == null) {
      this.updateSession();
      return sessionStorage.getItem('CartId');
    }
    return cartId;
  }

  isAdmin(): boolean {
    if (sessionStorage.getItem("AdminToken") == null)
      return false;
    return true;
  }

  updateSession(): void {

    this.http.get(this.REST_API_URL_BASE + "UserInfoes/" + this.getUserId())
      .subscribe((res: any) => {
        console.log("Got User Info.");
        console.log("CartId:", res.CartId);


        sessionStorage.setItem('CartId', res.CartId);
      })
  }

  createBookSubmission(bookSubmission: any): any {
    return this.http.post(this.REST_API_URL_BASE + "BookSubmissions/", bookSubmission)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  createAddress(address: any): any {
    return this.http.post(this.REST_API_URL_BASE + "Addresses/", address)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  deleteAddress(id: number): any {
    return this.http.delete(this.REST_API_URL_BASE + "Addresses/" + id)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  getUserCart(): Observable<Cart> {
    return this.http.get(this.REST_API_URL_BASE + "Carts/" + this.getUserCartId())
      .pipe(map((res: any) => {
        return res
      }));
  }

  updateCartQuantity(cartProduct: CartItem): any {
    return this.http.put(this.REST_API_URL_BASE + "CartProducts/" + cartProduct.CPId, cartProduct)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  checkoutCart(order: any): any {
    return this.http.post(this.REST_API_URL_BASE + "Orders/", order)
      .pipe(map((res: any) => {
        console.log(res);
        return res;
      }))
  }

  userNotAuthenticated(): void {
    console.log("User is not authenticated.");

  }

  addBookToCart(bookId: number): any {
    let cartId = this.getUserCartId();
    if (cartId == null) {
      this.userNotAuthenticated();
      throw "Not Authenticated.";
    }
    let cartProduct = {
      CartId: parseInt(cartId),
      BookId: bookId,
      Quantity: 1,
    }
    return this.http.post(this.REST_API_URL_BASE + "CartProducts/", cartProduct)
      .pipe(map((res: any) => {
        console.log(res);
        return res;
      }))
  }

  removeFromWishlist(id: number): any {
    return this.http.delete(this.REST_API_URL_BASE + "Wishlists/" + id)
      .pipe(map((res: any) => {
        return res;
      }))
  }


  addBookToWishlist(bookId: number): any {
    let userId = this.getUserId();
    if (userId == null) {
      this.userNotAuthenticated();
      throw "Not Authenticated.";
    }
    let wish = {
      UId: parseInt(userId),
      BookId: bookId,
    }
    return this.http.post(this.REST_API_URL_BASE + "Wishlists/", wish)
      .pipe(map((res: any) => {
        console.log(res);
        return res;
      }))
  }


  removeFromCart(id: number): any {
    return this.http.delete(this.REST_API_URL_BASE + "CartProducts/" + id)
      .pipe(map((res: any) => {
        console.log(res);
        return res;
      }))

  }

  getCoupon(code: string): any {
    return this.http.get(this.REST_API_URL_BASE + "Coupons/" + code)
      .pipe(map((res: any) => {
        console.log(res);
        return res;
      }))

  }

  getUserDetails(): any {
    return this.http.get(this.REST_API_URL_BASE + "UserInfoes/" + this.getUserId())
      .pipe(map((res: any) => {
        console.log(res);
        this.updateSession();
        return res;
      }))
  }
  updateUser(formdata:any,userForm:any):Observable<any>{
    return this.http.put(this.REST_API_URL_BASE+ "UserInfoes/"+this.getUserId(),formdata);
  }

}
