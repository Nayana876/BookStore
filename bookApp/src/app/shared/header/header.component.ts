import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthServicesService } from 'src/app/auth/auth-services.service';
import { TestimonialService } from 'src/app/testimonial.service';
import { CategoryService } from '../services/category.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
	catSubscription: Subscription | undefined = undefined;
	catData: any[] = [];
	CurrMenu: String = "Category";
	CurrCategory: String | null = "";
    optionSelected:String|null="--Choose filter--";
	searchText:String|any="";

	Categories:String="All Categories";
	Title:String="Title";
	Author:String="Author";
	ISBN:String="ISBN";
	Tag="Tag";
	selected="Filter here";
	loggedin:boolean=false;
    name:any;

	UserLoggedIn=false;
	AdminLoggedIn=false;
	constructor(private authserv:AuthServicesService, private testServ: TestimonialService, private catServ: CategoryService,private route:ActivatedRoute,private router:Router) { }

	ngOnInit(): void {

		this.route.paramMap.subscribe((params: ParamMap) => {
		this.catSubscription = this.testServ.getCategoryForDropdown()
			//3. get the response from the service
			.subscribe((res1: any) => {
				//console.log(res1);
				this.catData = res1;
				this.CurrMenu = this.catData[0].CName;
			});
			this.loggedin=this.authserv.isAuth();
		if(this.loggedin){
		console.log("logged in user")}
		this.name = "Hi "+sessionStorage.getItem('UserName');

		if(sessionStorage.getItem('Role')=='admin')
		{
			this.AdminLoggedIn=true;
			this.UserLoggedIn=false;
		}

		else{
			this.AdminLoggedIn=false;
			this.UserLoggedIn=true;
		}
		});
		
	}

	SearchByFilter():void{
		  
		  this.router.navigate(['/Searchbooks', this.optionSelected, this.searchText]);
		//this.router.navigate(['../Searchbooks'],{Filter:this.optionSelected,searchText:this.searchText});
	}

    logout():void{
		sessionStorage.removeItem('UserToken');
		sessionStorage.removeItem('AdminToken');
		this.loggedin=false;
		this.router.navigateByUrl('/home');
	}



}
