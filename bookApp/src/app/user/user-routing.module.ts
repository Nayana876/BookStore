import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { AddressListComponent } from './components/address-list/address-list.component';
import { AddressCreateComponent } from './components/address-create/address-create.component';
import { SuccessComponent } from './components/success/success.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { BookSubmitComponent } from './components/book-submit/book-submit.component';

const userRoutes: Routes = [
  {path: 'cart', component: CartComponent},
  {path: 'wishlist', component: WishlistComponent},
  {path: 'orders', component: OrderListComponent},
  {path: 'addresses', component: AddressListComponent},
  {path: 'address-create', component: AddressCreateComponent},
  {path: 'success', component: SuccessComponent},
  {path:'profile',component:UserProfileComponent},
  {path: 'book-submit', component: BookSubmitComponent},
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(userRoutes),
  ],
  exports: [
    RouterModule
  ]
})
export class UserRoutingModule { }
