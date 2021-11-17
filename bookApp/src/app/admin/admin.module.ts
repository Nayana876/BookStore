import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { UserStatusComponent } from './components/user-status/user-status.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchPanelComponent } from './components/search-panel/search-panel.component';
import { ViewOrdersComponent } from './order/view-orders/view-orders.component';
import { ViewComponent } from './book-submission/view/view.component';





@NgModule({
  declarations: [
    
  
    UserStatusComponent,

    SearchPanelComponent,
    ViewOrdersComponent,
    ViewComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AdminModule { }
