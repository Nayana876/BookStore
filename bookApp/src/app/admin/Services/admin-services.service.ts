import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AdminServicesService {

  ADMIN_API = "https://localhost:44390/api/UserSearch/";
  USER_API = "https://localhost:44390/api/UserInfoes/";

  constructor(private http: HttpClient, ) { }

  FindUserByUserNameOREmail(userName: string, email : string){
    
    const reqUser = {
      "username" : userName,
      "email" : email
    }

    return this.http.post(this.ADMIN_API, reqUser)
      .pipe(
        catchError( (error:HttpErrorResponse) => {
          console.log("Error in fetching User in Search Panel : Error Resp -> ", error);
          return throwError(error);
        }),
        map( (res:any) => {
          return res;
        })
      )
  }

  ChangeUserStatusById(userId : number, userData : any){
    

    return this.http.put(this.USER_API + userId, userData)
      .pipe(
        map( (res:any) => {
          return res;
        })
      )
  }

}
