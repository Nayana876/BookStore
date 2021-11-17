import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { BookService } from 'src/app/shared/services/book.service';

@Component({
  selector: 'app-book-carousel',
  templateUrl: './book-carousel.component.html',
  styleUrls: ['./book-carousel.component.css']
})
export class BookCarouselComponent implements OnInit {
 HomeBookList:any[]=[
   
   {
    Name:'Alchemist',
    Descri :'Horse Story',
    ImgSrc :'/assets/UImages/Books/alchemist.jpg'
  },
  {
    Name:'Harry Potter and sorcecer stones',
    Descri :'Horse Story',
    ImgSrc :'/assets/UImages/Books/harrystones.jpg'
  },
  {
    Name:'Meluha',
    Descri :'Horse Story',
    ImgSrc :'/assets/UImages/Books/meluha.jpg'
  },
  {
    Name:'The monk who sold his ferrari',
    Descri :'Horse Story',
    ImgSrc :'/assets/UImages/Books/monk.jpg'
  },
  {
    Name:'Sita',
    Descri :'Horse Story',
    ImgSrc :'/assets/UImages/Books/sita1.jpg'
  },

 ]
 bookSubscription: Subscription | undefined = undefined;
 BookData: any[] = [];
 TopBookslice1:any[]=[];
 TopBookslice2:any[]=[];


  constructor(private bookServ: BookService,private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe((params: ParamMap) => {
    this.bookSubscription = this.bookServ.getAllBooks()
    .subscribe((res: any) => {
      this.BookData = res;
   
    this.TopBookslice1=this.BookData.slice(0,3);
    this.TopBookslice2=[this.BookData.slice(3,6),this.BookData.slice(6,9)];
    console.log(this.TopBookslice1);
    console.log(this.BookData);

  });

				

});
  }

}
