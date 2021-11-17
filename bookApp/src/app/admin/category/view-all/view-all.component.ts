import { Component, OnInit } from '@angular/core';

import { ServiceService } from '../service.service';

@Component({
  selector: 'app-view-all',
  templateUrl: './view-all.component.html',
  styleUrls: ['./view-all.component.css']
})
export class ViewAllComponent implements OnInit {
  tableHeaders:any;
  tableContent:any = [];

  constructor(private catService : ServiceService) { }

  ngOnInit(): void {
    this.catService.getAllCategory()
      .subscribe( (res:any) =>{
        console.log("All categories returned are (in TS) -> ", res);

      this.tableHeaders = [];
      this.tableContent = [];

      this.tableHeaders = Object.keys(res[0]);

      //obj -> array
      for(let prop of Object.keys(res)){
        this.tableContent.push(res[prop]);
        // neededArray[i]['key'] = prop;
        
      }

      console.log("Finall Orders -> " , this.tableContent);
      })
  }

  Delete(id : number){
    this.catService.DeleteCategory(id)
      .subscribe((res:any) => {
        this.tableContent = this.tableContent.filter( (row:any) => row.CategoryId != id);
      })
  }

}
