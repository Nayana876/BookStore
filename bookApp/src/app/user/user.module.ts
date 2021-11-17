import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { CartComponent } from './components/cart/cart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { AddressListComponent } from './components/address-list/address-list.component';
import { AddressCreateComponent } from './components/address-create/address-create.component';
import { SuccessComponent } from './components/success/success.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { BookSubmitComponent } from './components/book-submit/book-submit.component';



@NgModule({
  declarations: [
    CartComponent,
    WishlistComponent,
    OrderListComponent,
    OrderDetailsComponent,
    AddressListComponent,
    AddressCreateComponent,
    SuccessComponent,
    UserProfileComponent,
    BookSubmitComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class UserModule { }
