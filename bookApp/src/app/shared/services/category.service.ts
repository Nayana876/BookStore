import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { observable } from 'rxjs';
import { catchError,map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  REST_API_URL="https://localhost:44390/api/Categories/";
  constructor(private http:HttpClient) { }

  getBooksOfAllCategory(cid:any):any{
    let REST_API_URL1=this.REST_API_URL+cid;
    return this.http.get(REST_API_URL1)
    .pipe(map( (res1:any) => {
      return res1;
    }));
  }
  async getCat(): Promise<any> {
    return this.http.get(this.REST_API_URL).toPromise();      
  }
}
