import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryService } from '../../services/category.service';


@Component({
	selector: 'app-categorydisplay',
	templateUrl: './categorydisplay.component.html',
	styleUrls: ['./categorydisplay.component.css']
})
export class CategorydisplayComponent implements OnInit {
    CurrCategory="";
	cid: String | null = "";
	catSubscription: Subscription | undefined = undefined;
	catDataAll: any[] = [];
	catDataSingle: any[] = [];
	l = 0;
	NoOfBooks = 0;
	stringObject: any;
	BooksOfCategory: any[] = [];
	constructor(private route: ActivatedRoute, private catServ: CategoryService, private router: Router) { }

	ngOnInit(): void {
		// let category = this.route.snapshot.paramMap.get('category');
		// this.CurrCategory=category;  not working

		this.route.paramMap.subscribe((params: ParamMap) => {
			this.cid = params.get('cid');
			this.catSubscription = this.catServ.getBooksOfAllCategory(this.cid)
				.subscribe((res: any) => {
					this.catDataSingle = [res];
					this.CurrCategory = this.catDataSingle[0].CName;
					//this.catDataSingle = this.catDataAll.filter(r => r.CName == this.CurrCategory);
					//this.router.navigate([this.router.url]);
					//console.log("Category is :", this.CurrCategory);        
				});
			//this.l=Object.keys(this.catDataSingle[0]).length;
			//  console.log(this.catDataSingle);
			//console.log("console first book")
			//console.log(this.catDataSingle[0].Books[0]);
			//console.log("console All book")
			//console.log(this.catDataSingle[0].Books);
			//console.log(this.catDataSingle.CName);



		});

	}









	AddtoCart(): void {
		console.log("Added an item to cart");

	}
}
