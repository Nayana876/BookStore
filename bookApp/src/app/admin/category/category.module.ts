import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryRoutingModule } from './category-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddComponent } from './add/add.component';
import { ViewAllComponent } from './view-all/view-all.component';
import { EditComponent } from './edit/edit.component';



@NgModule({
  declarations: [
    AddComponent,
    ViewAllComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  
})
export class CategoryModule { }
