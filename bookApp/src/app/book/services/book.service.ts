import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  public API = 'https://localhost:44390/api/Books/';
  postData: any;
  constructor(private http: HttpClient) { }

  getBooks(): Observable<any[]> {
    return this.http.get<any>(this.API);
  }
  async getBookById(id: any): Promise<any> {
    return this.http.get(this.API + id).toPromise();    
  }
 
  deleteBookById(id: number):Observable<any> {
    return this.http.delete(this.API + id);
  }
  deleteReview(id:number):Observable<any>{
    return this.http.delete("https://localhost:44390/api/Reviews/"+id);   
  }
  getReviews():Observable<any[]>{
    return this.http.get<any>("https://localhost:44390/api/Reviews");
  }
  addBook(postData: FormData,router:Router): Observable<any> {
    return this.http.post(this.API, postData);
  }
  updateBook(updateableBookData: any,router:Router):Observable<any> {
    // console.log(updateableBookData); // before submitting to the REST API
    return this.http.put(this.API + updateableBookData.BookId, updateableBookData)
     
     
  }
}
