import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderServiceService } from '../order-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-orders',
  templateUrl: './edit-orders.component.html',
  styleUrls: ['./edit-orders.component.css']
})
export class EditOrdersComponent implements OnInit {

  
  editOrderForm = new FormGroup({
    'UserId' : new FormControl(),
    'OrderId' : new FormControl(),
    'OrderPrice' : new FormControl(),
    'OrderStatus' : new FormControl(),
    'OrderDate' : new FormControl(),
    'CartId' : new FormControl(),
    'Coupon' : new FormControl(),
    'Coins' : new FormControl(),
  });
  orderid : any;
  order : any;
  failedUpdate = false;
  successUpdate = false;
  errorMessage = "";

  constructor(private route:ActivatedRoute,private router: Router, private orderService: OrderServiceService) { }

  ngOnInit(): void {
    this.orderid = this.route.snapshot.paramMap.get('id');
    this.orderService.GetOrderById(this.orderid)
      .subscribe( (res:any) => {
        console.log("Oder Data recived in Edit order -> ", res);

        this.order = res; 

        this.editOrderForm = new FormGroup({
          'UserId' : new FormControl(this.order.UserId, Validators.required),
          'OrderId' : new FormControl(this.order.OrderId),
          'OrderPrice' : new FormControl(this.order.OrderPrice),
          'OrderStatus' : new FormControl(this.order.OrderStatus),
          'OrderDate' : new FormControl(this.order.OrderDate),
          'CartId' : new FormControl(this.order.CartId, Validators.required),
          'Coupon' : new FormControl(this.order.Coupon),
          'Coins' : new FormControl(this.order.Coins),
        });
      });
  }

  editOrder(){
    console.log("Editing Submitted for Order-> ", this.editOrderForm.value);
    this.orderService.PutOrder(this.editOrderForm.value, this.orderid)
      .subscribe ( (res:any) =>{
        console.log("Updated order recived = ", res)
        this.failedUpdate = false;
        this.successUpdate = true;
        this.order = res;
      },
      (error:string) => {
        console.log("error here in TS of edit order -> ", error);
        this.successUpdate = false;
        this.failedUpdate = true;

        if(error.includes("CartId"))
          this.errorMessage = "CartId invalid";
        else if(error.includes("UserId"))
          this.errorMessage = "UserId invalid";
        else if(error.includes("OrderPrice"))
          this.errorMessage = "OrderPrice invalid";
        else if(error.includes("OrderStatus"))
          this.errorMessage = "OrderStatus invalid";
        else if(error.includes("OrderDate"))
          this.errorMessage = "OrderDate invalid";
        else if(error.includes("Coupon"))
          this.errorMessage = "Coupon invalid";
        else if(error.includes("Coins"))
          this.errorMessage = "Coins invalid";
        else  
          this.errorMessage = "Unknown Error Occured";
      });
  }

}
