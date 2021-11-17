import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  REST_API_URL="https://localhost:44390/api/Books";
  constructor(private http:HttpClient) { }

  getAllBooks():any{    
    return this.http.get(this.REST_API_URL)
    .pipe(map( (res1:any) => {
      return res1;
    }));
  }
}
