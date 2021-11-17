import { Component, OnInit } from '@angular/core';
import { BookSubmissionServiceService } from '../book-submission-service.service';
import {Router, NavigationExtras} from "@angular/router";


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  tableHeaders:any;
  tableContent:any = [];
  thiController = "BookSubmission";

  constructor(private router: Router, private bookSubmissionService : BookSubmissionServiceService) { }

  ngOnInit(): void {

    this.bookSubmissionService.getAllSubmissions()
     .subscribe( (res:any) => {
      //  console.log("All sub's from backend in ts -> ", res);

      this.tableHeaders = [];
      this.tableContent = [];

      this.tableHeaders = Object.keys(res[0]);

      //obj -> array
      for(let prop of Object.keys(res)){
        this.tableContent.push(res[prop]);
        // neededArray[i]['key'] = prop;
        
      }

      console.log("Finall Sub's in ts -> " , this.tableContent);
     })
  }
  EditRow(BookSubmission:any){ //trigggered when edit button clicked
    //sends the 'want-to-edit' object here (from html)
    console.log("Data to send as navigational => ", BookSubmission);
    let navigationExtras : NavigationExtras = {
      queryParams : { "BookSubmission" : JSON.stringify(BookSubmission)} 
    }

    this.router.navigate(["./admin/bookSubmission/Edit"], navigationExtras);
  }
  Delete(id: number){
    this.bookSubmissionService.DeleteSubmission(id)
      .subscribe( (res:any) => {
        console.log("Res after deleting Book Submission in TS -> ", res);
        this.tableContent = this.tableContent.filter((content:any) => content.BSId != id); //removing the deleted from the earlier stored array
      })
  }

  Approve(bookSubmission:any){
    let navigationExtra : NavigationExtras = {
      queryParams : {"Book" : JSON.stringify(bookSubmission)}
    }
    this.router.navigate(["./admin/bookSubmission/Approve"], navigationExtra)
  }

  handleTableDataRecieved(userEntireData : any){
    console.log("Table Data recieved from Search panel to Parent -> ", userEntireData);
    console.log("Table Content -> ", this.tableContent);
    
    this.tableContent = [];
    const allSubmissions = userEntireData.BookSubmissions;
    delete userEntireData['BookSubmissions'];

    allSubmissions.forEach((submission:any) => {
      this.tableContent.push(
        Object.assign(
          submission,
          {"UserInfo" : userEntireData }
          )
       )
    });
  
    console.log("Final Data after assigning(appening) -> ", this.tableContent);
  
  }

  

}
