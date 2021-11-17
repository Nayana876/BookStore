import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';
import { ApproveBookComponent } from './approve-book/approve-book.component';

const authRoutes:Routes = [
  {path: 'View', component: ViewComponent},
  {path: 'Edit', component: EditComponent},
  {path: 'Approve', component: ApproveBookComponent},

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
export class BookSubmissionRoutingModule { }
