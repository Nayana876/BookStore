import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewOrdersComponent } from './view-orders/view-orders.component';
import { RouterModule, Routes } from '@angular/router';
import { EditOrdersComponent } from './edit-orders/edit-orders.component';

const authRoutes:Routes = [
  {path: 'viewOrders', component: ViewOrdersComponent},
  {path: 'viewOrders/:id', component: EditOrdersComponent},
  
  
  ]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(authRoutes)
  ],
  exports:[
    RouterModule
  ]
})
export class OrderRoutingModule { }
