import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BookService } from '../../services/book.service';
import { HttpClient } from '@angular/common/http';
import { Book } from '../../models/book';
import { CategoryService } from 'src/app/shared/services/category.service';
import { ToastService } from 'src/app/shared/toasts/services/toast.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {

  bookForm!: FormGroup;
  book = new Book();
  categories: any;
  categoryList: any;
  submitted: boolean = false;

  constructor(
    private router: Router,
    private bookService: BookService,
    private route: ActivatedRoute,
    private categoryService:CategoryService,
    private toastService:ToastService) {

    this.bookForm = new FormGroup({
      BookId: new FormControl(),
      Title: new FormControl('',[Validators.required, Validators.maxLength(20)]),
      CId: new FormControl(),
      Author: new FormControl('',Validators.required),
      ISBN: new FormControl('',Validators.maxLength(20)),
      BookYear: new FormControl('',Validators.pattern("[0-9]{4}")),
      BRating: new FormControl(),
      Quantity: new FormControl(0,Validators.min(0)),
      Price: new FormControl(0,Validators.min(0)),
      BDescri: new FormControl('',Validators.maxLength(500)),
      BPosition: new FormControl(),
      BStatus: new FormControl(),
      BImgFile: new FormControl(),
      BCondition: new FormControl(),
      BTags: new FormControl('',Validators.maxLength(200)),

    });
  }

  async ngOnInit() {

    let BId = this.route.snapshot.paramMap.get('id');
    this.book = await this.bookService.getBookById(BId);
    this.bookForm.setValue({
      BookId: this.book['BookId'],
      Title: this.book['Title'],
      CId: this.book.Category['CName'],
      Author: this.book['Author'],
      ISBN: this.book['ISBN'],
      BookYear: this.book['BookYear'],
      BRating: this.book['BRating'],
      Quantity: this.book['Quantity'],
      Price: this.book['Price'],
      BDescri: this.book['BDescri'],
      BPosition: this.book['BPosition'],
      BStatus: this.book['BStatus'],
      BImgFile: this.book['BImgFile'],
      BCondition: this.book['BCondition'],
      BTags: this.book['BTags'],
    });
    this.categories = await this.categoryService.getCat();
    console.log(this.categories);
    this.categoryList = this.categories.filter((name: any) => name != this.book.Category['CName']);

  }

  async editBook() {
    this.submitted = true;
    this.categories.map((cat: any) => {
      if (cat.CName == this.bookForm.controls['CId'].value) {
        this.bookForm.controls['CId'].setValue(cat.CategoryId);
      }
    });
    if (this.bookForm.valid) {
      this.bookService.updateBook(this.bookForm.value, this.router).subscribe(
        (res: any) => this.toastService.show("Book details Updated..!",{classname:'bg-success text-light, delay 3000'}),
        (err: any) => {this.toastService.show("Error ",{classname:'bg-success text-light, delay 3000'}); },
        ()=>{this.router.navigateByUrl('book');}
    );
    }

  }

}
