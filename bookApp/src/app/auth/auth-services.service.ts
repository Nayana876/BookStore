import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { catchError, map } from "rxjs/operators";
import { ICreateUser, ILoginUser } from './userInterfaces';
import {  Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServicesService {

  API = "https://localhost:44390/api/UserInfoes"

  constructor(private http: HttpClient) { }

  createUser(userData: ICreateUser){

   return this.http.post(this.API, userData)
      .pipe( 
        catchError( this.handleError),
        map( (res:any) => {
        console.log("Response from Create User API Service -> ", res);
        
        return res;
      }));
  }

  handleError(error : HttpErrorResponse){
    if(error.status === 401)
      return throwError("User Credentials are Invalid");
    
    else if(error.status === 404)
     return throwError("User NOT Found");
    
    else if (error.status === 406)
      return throwError("Email Already Exsists");
    
    else if (error.status === 409)
      return throwError("UserName Already Exsists");
    
    else{
      return throwError(`[ERROR CODE ${error.status}] Unknown Error Occured`);
    }
  }

  loginUser(userData: ILoginUser): Observable<HttpResponse<any>>{

    return this.http.put(this.API, userData, { observe: 'response'} )
      .pipe( 
        catchError( this.handleError),
        map ( (res:any) => {
        //console.log("Response of Login User inside Auth Services -> ", res);
        return res;
      }));
  }

  isAuth():boolean
  {
    if(sessionStorage.getItem('UserToken') || sessionStorage.getItem('AdminToken'))
    {
    return true;
    }
    return false;
  }
}
