import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/shared/toasts/services/toast.service';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-home-book',
  templateUrl: './home-book.component.html',
  styles: [
   
  ]
})
export class HomeBookComponent implements OnInit {
  books:any[] | undefined;
  book:any;
  constructor(private bookServcie:BookService,private toastService:ToastService) { }

  ngOnInit(): void {
    this.allBooks();
  }
  allBooks(){
    this.bookServcie.getBooks().subscribe(data=>{
      this.books=data;
      
      // console.log(this.books[0].Price)
    })
    
  }
 
  deleteBook(id:any){
    this.bookServcie.deleteBookById(id).subscribe(
      res => {
      this.toastService.show("Book deleted",{classname:'bg-success text-light, delay 3000'})
      this.ngOnInit();
    },
    err=>{
      this.toastService.show("This entry cannot be deleted..!",{classname:'bg-success text-light, delay 3000'})
    }
    );
    
  }
  
}
