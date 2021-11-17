import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AdminServicesService } from '../../Services/admin-services.service';
import { SearchPanelServiceService } from './Services/search-panel-service.service';

@Component({
  selector: 'app-search-panel',
  templateUrl: './search-panel.component.html',
  styleUrls: ['./search-panel.component.css']
})
export class SearchPanelComponent implements OnInit {

  @Input() controllerName : any;

  @Output() userEntireData : EventEmitter<any> = new EventEmitter()

  toSearchTerm : any;
  res:any;

  userFoundError = false;
  errorMessage = "";
  
  constructor(private userService : AdminServicesService, private searchPanelService: SearchPanelServiceService) { }

  ngOnInit(): void {
  }

  handleSearch(){
    
    if(this.toSearchTerm?.includes("@"))
     {  this.res = this.userService.FindUserByUserNameOREmail("", this.toSearchTerm);}
    else{
       this.res = this.userService.FindUserByUserNameOREmail( this.toSearchTerm, "")
    }
    
    
    this.res.subscribe( (userEntireData:any) =>{
        console.log("User found", userEntireData);
        this.userFoundError = false;
        this.userEntireData.emit(userEntireData); //contains entire user info inclding their book submission, reviews everything as they are all connected by a foregin key

    },
      (error: any) => {
      console.log("USer Not found Error ->" ,error);
      this.userFoundError = true;
      this.errorMessage = "User Does Not Exsist";

    })
    
  }

}
