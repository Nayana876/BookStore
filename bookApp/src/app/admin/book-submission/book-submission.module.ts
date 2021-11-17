import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookSubmissionRoutingModule } from './book-submission-routing.module';
import { EditComponent } from './edit/edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApproveBookComponent } from './approve-book/approve-book.component';



@NgModule({
  declarations: [
    
    EditComponent,
    ApproveBookComponent
  ],
  imports: [
    CommonModule,
    BookSubmissionRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class BookSubmissionModule { }
