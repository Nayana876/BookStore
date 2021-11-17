import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserStatusComponent } from './components/user-status/user-status.component';

const authRoutes:Routes = [
  {path: 'userStatus', component: UserStatusComponent},
  {
    path: 'orders',
    loadChildren: () => import('./order/order.module').then(m => m.OrderModule)
  },
  {
    path: 'category',
    loadChildren: () => import('./category/category.module').then(m => m.CategoryModule)
  },
  {
    path: 'bookSubmission',
    loadChildren: () => import('./book-submission/book-submission.module').then(m => m.BookSubmissionModule)
  },


  
  
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
export class AdminRoutingModule { }
