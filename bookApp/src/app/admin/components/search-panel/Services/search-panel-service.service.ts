import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchPanelServiceService {

  API = "https://localhost:44390/api"

  constructor(private http: HttpClient) { }

  getAllDataOfUserById(id:number, controller:string){
    return this.http.get(this.API + "/" + controller + "/" + id)
      .pipe( 
        catchError ( (error : HttpErrorResponse) => {
          console.log("Eror in fetching Tablle Data of User ->", error);
          return throwError(error.message);
        }),
        map((res:any) => {
          return res;
      }))
  }
}
