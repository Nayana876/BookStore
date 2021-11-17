import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Order } from '../../models/order.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  orders: Order[] = [];
  orderSubscription: Subscription | undefined = undefined;
  constructor(private userService: UserService) { }

  totalBooks(order: Order): number {
    let res: number = 0;
    order.Cart.CartProducts.forEach(book => {
      res += book.Quantity;
    });
    return res;
  }

  ngOnInit(): void {
    this.orderSubscription = this.userService.getUserDetails()
      .subscribe((res: any) => {
        this.orders = res.Orders;
      })
  }

}
