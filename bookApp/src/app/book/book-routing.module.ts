import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeBookComponent } from './components/home-book/home-book.component';
import { RouterModule, Routes } from '@angular/router';
import { EditBookComponent } from './components/edit-book/edit-book.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { DeleteReviewComponent } from './components/delete-review/delete-review.component';

const bookRoutes:Routes = [
  {path:'reviews',component:DeleteReviewComponent},
  {path: '', component: HomeBookComponent},
  {path: 'add', component: AddBookComponent},
  {path: ':id', component:EditBookComponent},
 
  ]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(bookRoutes)
  ],
  exports:[
    RouterModule
  ]
})
export class BookRoutingModule { }
