import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookRoutingModule } from './book-routing.module';
import { HomeBookComponent } from './components/home-book/home-book.component';
// import { EditCouponComponent } from './components/edit-coupon/edit-coupon.component';
import { EditBookComponent } from './components/edit-book/edit-book.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AddBookComponent } from './components/add-book/add-book.component';
import { DeleteReviewComponent } from './components/delete-review/delete-review.component';



@NgModule({
  declarations: [
    HomeBookComponent,
    
    EditBookComponent,
         AddBookComponent,
         DeleteReviewComponent
  ],
  imports: [
    CommonModule,
    BookRoutingModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class BookModule { }
