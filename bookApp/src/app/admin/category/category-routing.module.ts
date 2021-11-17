import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './add/add.component';
import { ViewAllComponent } from './view-all/view-all.component';
import { EditComponent } from './edit/edit.component';

const authRoutes:Routes = [
  {path: 'add', component: AddComponent},
  {path: 'view', component: ViewAllComponent},
  {path: 'view/:id', component: EditComponent},
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
export class CategoryRoutingModule { }
