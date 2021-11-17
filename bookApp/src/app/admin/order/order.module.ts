import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderRoutingModule } from './order-routing.module';

import { EditOrdersComponent } from './edit-orders/edit-orders.component';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    
    EditOrdersComponent,   
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    
  ]
})
export class OrderModule { }
