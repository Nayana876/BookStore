import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookSubmissionServiceService {
  

  API = "https://localhost:44390/api/BookSubmissions"
  BOOKAPI = "https://localhost:44390/api/Books"

  constructor(private http : HttpClient) { }

  getAllSubmissions(){
    return this.http.get(this.API)
      .pipe( (res:any) => {
        return res;
      })
  }

  addSubmission(submission: any) {
    return this.http.post(this.API, submission)
      .pipe(map( (res: any) => {
        return res;
      }))
  }

  UpdateSubmission(id:number, obj: any){
    return this.http.put(this.API + "/" + id, obj)
      .pipe( map( (res:any) => {
        return res;
      }));

  }

  DeleteSubmission(id:number){
    return this.http.delete(this.API + "/" + id)
    .pipe( map( (res:any) => {
      return res;
    }));
  }

   handleError(error: HttpErrorResponse){
     console.log("Error Occured in Service of Book Submission -> ", error);
    return throwError(error.message);
  }

  AddBook = (Book : any) => {
    return this.http.post(this.BOOKAPI, Book)
      .pipe ( catchError( this.handleError),
              map((res:any) => {
                return res;
              }))
  }
}
