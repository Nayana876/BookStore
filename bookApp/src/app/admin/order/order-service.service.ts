import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderServiceService {
  API = "https://localhost:44390/api/Orders"
  
  handleError(error : HttpErrorResponse){
    console.log("Error Object recieved from backend (in orderServiceTS) is -> ", error)
    return  throwError(error.error.InnerException.InnerException.ExceptionMessage);
;
  }

  getAllOrders(){
    return this.http.get(this.API)
      .pipe( (res:any) => {
        return res;
      })
  }

  DeleteOrder(orderId : number){
    return this.http.delete(this.API + "/" + orderId)
      .pipe ( (res:any) => {
        return res;
      })
  }

  GetOrderById(orderId:string|null){
    return this.http.get(this.API + "/" + orderId)
      .pipe( (res:any) => {
        return res;
      })
  }

 PutOrder(order : any, orderId : any){
   return this.http.put(this.API + "/" + orderId, order)
    .pipe ( 
      catchError( this.handleError),
      map ((res:any) => {
      return res;
    }));
 }
  constructor(private http: HttpClient) { }
}
