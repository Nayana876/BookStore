import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BookPageComponent } from './components/book-page/book-page.component';
import { AddReviewComponent } from './components/add-review/add-review.component';

const bookDetailsRoutes:Routes = [
 
  {path: ':id', component:BookPageComponent},
  {path:':id/Review',component:AddReviewComponent}
  
  ]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(bookDetailsRoutes)
  ],
  exports:[
    RouterModule
  ]
})
export class BookDetailsRoutingModule { }
