import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookDetailsRoutingModule } from './book-details-routing.module';
import { AddReviewComponent } from './components/add-review/add-review.component';
import { BookPageComponent } from './components/book-page/book-page.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AddReviewComponent,
    BookPageComponent,
    
  ],
  imports: [
    CommonModule,
    BookDetailsRoutingModule,
    ReactiveFormsModule
  ]
})
export class BookDetailsModule { }
