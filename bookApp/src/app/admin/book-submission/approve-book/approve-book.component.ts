import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookSubmissionServiceService } from '../book-submission-service.service';
import { ServiceService } from "../../category/service.service";
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-approve-book',
  templateUrl: './approve-book.component.html',
  styleUrls: ['./approve-book.component.css']
})
export class ApproveBookComponent implements OnInit {
 
  Book : any;
  SubmittedBookId : any; //to be later used to delete that submission on success addition of book

  failedUpdate = false;
  successUpdate = false;
  errorMessage = "";

  Available_categories:any = [];
  StatusOptions = ['Unavailable', 'Available'];
  BookConditions = ['New', 'Used'];

  allDataRecieved = false;

  addBookForm = new FormGroup({
    'CId' : new FormControl(),
    'CategoryName' : new FormControl(),
    'Title' : new FormControl(),
    'ISBN' : new FormControl(),
    'BookYear' : new FormControl(),
    'BRating' : new FormControl(),
    'Quantity' : new FormControl(),
    'Price' : new FormControl(),
    'BDescri' : new FormControl()
     
  });
  
  constructor(private router: Router, private route:ActivatedRoute , private bookSubmissionSerive : BookSubmissionServiceService, private categoryService : ServiceService) {
    //1.getting data from URL (whihc is send by prev compoenet via navigational prop)
    this.route.queryParams.subscribe( params => {
      this.Book = JSON.parse(params.Book);
      this.SubmittedBookId = this.Book.BSId;
      console.log("Book submission recieved -> ", this.Book);

      //2.getting all categories from api
      this.categoryService.getAllCategory().subscribe((res:any) => {
        this.Available_categories = res; 
        console.log("All Categories => ", this.Available_categories);

        
        //Init form w all the recieved data
        this.addBookForm  = new FormGroup({
          'CId' : new FormControl(this.Available_categories[0]?.CategoryId, [ Validators.required]),
          'Title' : new FormControl(this.Book.Title,[ Validators.required]),
          'Author' : new FormControl(this.Book.Author, [ Validators.required]),
          'ISBN' : new FormControl('S00100', [ Validators.required]),
          'BookYear' : new FormControl('2020', [ Validators.required]),
          'BRating' : new FormControl('0', [ Validators.required, Validators.pattern('[0-5]')]),
          'Quantity' : new FormControl('1', [ Validators.required, Validators.pattern('[0-9]*')]),
          'Price' : new FormControl('200', [ Validators.required,  Validators.pattern('[0-9]*')] ),
          'BDescri' : new FormControl(this.Book.Description, [ Validators.required]),
          'BPosition' : new FormControl('0', [ Validators.required,  Validators.pattern('[0-9]*')]),
          'BStatus' : new FormControl('Unavailable', [ Validators.required]),
          'BCondition' : new FormControl(this.Book.Condition, [ Validators.required]),
          'BTags' : new FormControl('#'),
          
        });
        
        this.allDataRecieved = true;
      })
    })
   
   }

  ngOnInit(): void {
  

 
  }
  onSubmit(){
    console.log("Submitted Form -> ",this.addBookForm.value);

    this.bookSubmissionSerive.AddBook(this.addBookForm.value)
      .subscribe( (res:any) => {
        console.log("Res in approve book TS after succesfull Book Addition -> ", res);

        this.bookSubmissionSerive.DeleteSubmission(this.SubmittedBookId)
          .subscribe( (res:any)=>{
            console.log("Book Submission Deleted! as Book is Approved");

            this.failedUpdate = false;
            this.successUpdate = true;

            this.router.navigate(["./admin/bookSubmission/View"])
          })


      },
      (error:string) => {
        console.log("Erorr Occured while adding Book -> ", error);
        this.failedUpdate = true;
        this.successUpdate = false;
        this.errorMessage = error;

      })
  }

}
