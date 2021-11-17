import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, interval as observableInterval } from 'rxjs';
import { takeWhile, scan, tap } from "rxjs/operators";
import { ToastService } from 'src/app/shared/toasts/services/toast.service';
import { Address } from '../../models/address.model';
import { CartItem } from '../../models/cart-item.model';
import { Cart } from '../../models/cart.model';
import { Coupon } from '../../models/coupon.model';
import { Order } from '../../models/order.model';
import { UserService } from '../../services/user.service';

@Component({
	selector: 'app-cart',
	templateUrl: './cart.component.html',
	styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

	couponInput: string = "";
	couponInfo: string = "";
	couponStyle = { 'color': "red" };
	coupon!: Coupon;


	coinInput: string = "";
	coinInfo: string = "";
	coinStyle = { 'color': "red" };
	coins: number = 0;

	orderPrice: number = 0;
	discount: number = 0;
	couponInfoVisible: boolean = false;
	checkingOut = false;
	val: number = 0;
	cart: Cart = new Cart;
	addresses: Address[] = [];
	selectedAddress: number = -1;
	cartSubscription: Subscription | undefined = undefined;

	constructor(private userService: UserService, private router: Router, private toastService: ToastService) { }

	selectAddress(id: number): void {
		this.selectedAddress = id;
	}
	editAddress(id: number): void {

	}
	deleteAddress(id: number): void {

	}

	proceedToCheckout(el: HTMLElement): void {
		this.checkingOut = !this.checkingOut;
		setTimeout(() => {
			el.scrollIntoView()
		}, 100);
	}

	calculateOrderPrice(): void {
		this.orderPrice = this.getCartprice();
		this.discount = 0;
		if (this.coupon) {
			if (this.orderPrice > this.coupon.MinimumOrderPrice) {
				this.discount += Math.min(this.coupon.DiscountPercentage * this.orderPrice / 100, this.coupon.MaximumDiscount);
			}
		}
		else
			console.log("No Coupon.");

		if (this.coins >= 0)
			this.discount += this.coins;
		else
			console.log("Invalid coins.");

		this.orderPrice -= this.discount;

	}

	couponBtnClick(): void {
		if (this.couponInput == "") {
			this.couponStyle = { 'color': "black" };
			this.couponInfo = "No coupon code entered."
			return;
		}

		this.userService.getCoupon(this.couponInput)
			.subscribe(
				(res: any) => {
					this.coupon = res;
					console.log(this.coupon);
					this.couponInfoVisible = true;
					this.couponStyle = { 'color': "green" };
					this.couponInfo = `Coupon Applied! ${this.coupon.DiscountPercentage}% OFF upto ₹${this.coupon.MaximumDiscount} on a minimum order of ₹${this.coupon.MinimumOrderPrice}.`
					this.calculateOrderPrice();
				},
				(error: any) => {
					if (error.status == 404) {
						console.log('not found');

						this.couponInfoVisible = true;
						this.couponStyle = { 'color': "red" };
						this.couponInfo = "Coupon code invalid."
					} else {
						this.couponInfo = error.status + " " + error.statusText;
						throw (error)
					}
				}
			)
	}

	removeBtnClick(id: number) {
		this.userService.removeFromCart(id)
			.subscribe(
				(res: any) => {
					this.toastService.show("Book removed from cart.", { classname: "bg-success text-light", delay: 3000 });
					this.cartSubscription = this.userService.getUserCart()
						.subscribe((res: Cart) => {
							this.cart = res;
						})
				},
				(err: any) => {
					this.toastService.show("Error removing book.", { classname: "bg-danger text-light", delay: 3000 })
					console.error(err);
				}
			)
	}

	onChange(i: number) {
		console.log(this.cart.CartProducts[i]);

		this.cartSubscription = this.userService.updateCartQuantity(this.cart.CartProducts[i])
			.subscribe((res: any) => {
			})
	}


	getCartprice(): number {
		let res = 0;
		this.cart.CartProducts.forEach(cartProduct => {
			res += (cartProduct.Quantity * cartProduct.Book.Price);
		});
		return res;
	}
	coinBtnClick(): void {
		if (this.coinInput == "") {
			this.coinStyle = { 'color': "black" };
			this.coinInfo = "No coins entered."
			return;
		}

		let coins = parseInt(this.coinInput);
		this.userService.getUserDetails()
			.subscribe(
				(res: any) => {
					let userCoins = res.Coins;
					if (coins <= userCoins) {
						this.coins = coins;
						this.coinStyle = { 'color': "green" };
						this.coinInfo = `${coins} coins redeemed!`
					} else {
						this.coins = 0;
						this.coinStyle = { 'color': "red" };
						this.coinInfo = `Insufficient coins in wallet.`
					}
					this.calculateOrderPrice();
				}
			)
	}

	onCheckoutClick() {
		console.log(new Date());
		let order: any = {
			CartId: this.cart.CartId,
			OrderPrice: this.orderPrice,
			OrderDate: new Date(),
			OrderStatus: 0,
			UserId: this.userService.getUserId(),
			AId: this.selectedAddress,
			Coins: this.coins,
		}
		if (this.coupon)
			order['Coupon'] = this.coupon.CouponId;

		this.userService.checkoutCart(order)
			.subscribe(
				(res: Order) => {
					console.log(res);
					this.router.navigate(['/user/success']);
				},
				(err: any) => {
					if (err.status === 401)
						this.toastService.show("You are not authorized to create an order.", { classname: "bg-danger text-light", delay: 5000 })
					else
						this.toastService.show("Error creating order.", { classname: "bg-danger text-light", delay: 3000 })

					console.error(err);
				}
			)
	}

	ngOnInit(): void {
		this.cartSubscription = this.userService.getUserDetails()
			.subscribe((res: any) => {
				console.log(res.Addresses);

				this.cart = res.Cart;
				this.addresses = res.Addresses;
				this.orderPrice = this.getCartprice();
			})
	}

}