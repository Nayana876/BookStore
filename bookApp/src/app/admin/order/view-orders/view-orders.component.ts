import { Component, OnInit } from '@angular/core';
import { OrderServiceService } from '../order-service.service';

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.css']
})
export class ViewOrdersComponent implements OnInit {
  
  thiController = "Orders";
  tableHeaders:any;
  tableContent:any = [];

  OncomponentLoad = () => {
    this.orderService.getAllOrders()
    .subscribe( (res:any) => {
      console.log("Orders - > ", res);

      this.tableHeaders = [];
      this.tableContent = [];

      this.tableHeaders = Object.keys(res[0]);

      let i=0;
      for(let prop of Object.keys(res)){
        this.tableContent.push(res[prop]);
        // neededArray[i]['key'] = prop;
        i++;
      }

      console.log("Finall Orders -> " , this.tableContent);
    }); 
    }

  constructor(private orderService : OrderServiceService) {
    

   }

  ngOnInit(): void {
 
    this.OncomponentLoad();
 
  }

  Delete(order: any){
    console.log("Delete Order ->", order);
    this.orderService.DeleteOrder(order.OrderId)
      .subscribe( (res:any) => {
        console.log("Response After Deletion -> ", res);
        //finally removin the delered obj from array
        this.tableContent =  this.tableContent.filter((obj: any) => obj !== order);

      })
  }

  Edit(orderId: number){
    console.log("Edit Order ->", orderId);
  }


  handleTableDataRecieved(userEntireData : any){
    console.log("Table Data recieved from Search panel to Parent -> ", userEntireData);
    console.log("Table Content -> ", this.tableContent);
    

     
    this.tableContent = [];
    const allOrders = userEntireData.Orders;
    delete userEntireData['BookSubmissions'];

    allOrders.forEach((order:any) => {
      this.tableContent.push(
        Object.assign(
          order,
          {"UserInfo" : userEntireData }
          )
       )

  });
}

}


