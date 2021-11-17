import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/shared/toasts/services/toast.service';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-delete-review',
  templateUrl: './delete-review.component.html',
  styleUrls: ['./delete-review.component.css']
})
export class DeleteReviewComponent implements OnInit {

  constructor(private bookservice: BookService,private toastService:ToastService) { }
  reviews!: any[];
  ngOnInit(): void {
    this.bookservice.getReviews().subscribe(data => {
      this.reviews = data;
    })

  }
  deleteReview(id: number) {

    this.bookservice.deleteReview(id).subscribe((data: any) => {
      this.toastService.show("Review deleted",{classname:'bg-success text-light, delay 3000'})
      this.ngOnInit();
    });
  }

}
