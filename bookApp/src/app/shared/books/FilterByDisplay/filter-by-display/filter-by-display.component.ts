import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { BookService } from 'src/app/shared/services/book.service';

@Component({
	selector: 'app-filter-by-display',
	templateUrl: './filter-by-display.component.html',
	styleUrls: ['./filter-by-display.component.css']
})
export class FilterByDisplayComponent implements OnInit {

	bookSubscription: Subscription | undefined = undefined;
	BookData: any[] = [];
	FilteredBooks: any[] = [];
    searchText: any;
	filter: any;
	NoMatchDisplay = false;
	NoBookorError = false;
	Error = false;
	constructor(private bookServ: BookService, private route: ActivatedRoute) { }

	ngOnInit(): void {

		this.route.paramMap.subscribe((params: ParamMap) => {
			this.filter = params.get('Filter');
			this.searchText = params.get('searchText');

			this.bookSubscription = this.bookServ.getAllBooks()
				.subscribe((res: any) => {
					this.BookData = res;

					//console.log(this.BookData);					
					if (this.filter == 'Title') {
						this.FilteredBooks = this.BookData.filter(r => r.Title.toLowerCase().includes(this.searchText.toLowerCase()));
					}
					else if (this.filter == 'Tag') {
						this.FilteredBooks = this.BookData.filter(r => (r.BTags != null) && (r.BTags.toLowerCase().includes(this.searchText.toLowerCase())));
					}
					else if (this.filter == 'Author') {
						this.FilteredBooks = this.BookData.filter(r => (r.Author != null) && (r.Author.toLowerCase().includes(this.searchText.toLowerCase())));
					}
					else if (this.filter == 'ISBN') {
						this.FilteredBooks = this.BookData.filter(r => (r.ISBN != null) && (r.ISBN.toLowerCase().includes(this.searchText.toLowerCase())));
					}
					
					console.log(this.FilteredBooks.length);
					//console.log(this.searchText);
					//console.log(this.filter);
					//console.log(this.BookData);
					if ((this.filter == "--Choose filter--") || (this.searchText == "")) {
						this.NoMatchDisplay = true;
						this.NoBookorError = false;
						//console.log("inside first if");
						//console.log(this.NoMatchDisplay);
						
					}
					else  if(this.FilteredBooks.length == 0){
						this.NoMatchDisplay = true;
						this.NoBookorError = true;
						//console.log("inside second if");
					}
					else if(this.FilteredBooks.length >= 1){
						this.NoMatchDisplay = false;
						//console.log("inside third if");
					}
					//console.log(this.NoMatchDisplay);

				});

				

		});


	}



}
