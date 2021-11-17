import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  API = "https://localhost:44390/api/Categories"
  constructor(private http : HttpClient) { }

  handleError(error : HttpErrorResponse){
    console.log("Error Object recieved from backend (in Edit Category Serivice) is -> ", error)
    return  throwError(error.message);
;
  }
  addCategory(category : any){
   return  this.http.post(this.API, category)
      .pipe( map((res:any) => {
        return res;
      }));
  }

  getAllCategory(){
    return this.http.get(this.API)
      .pipe( map ((res:any) => {
        return res; 
      }));
  }

  getCategoryByid(id: number){
    return this.http.get(this.API + "/" + id)
    .pipe( map ((res: any) => {
              return res;
            }));
  }

  updateCategory(id: number, category : any){
    return this.http.put(this.API + "/" + id, category)
    .pipe ( catchError ( this.handleError),
            map ((res:any) => {
              return res;
            }));
  }

  DeleteCategory(id : number){
    return this.http.delete(this.API  + "/" + id)
    .pipe( (res:any) => {
      return res;
    })
  }

 
}
