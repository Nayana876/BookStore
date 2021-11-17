import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  public Api="https://localhost:44390/api/Reviews";
  constructor(private http:HttpClient) { }

  async getReviews(): Promise<any[]> {
    return this.http.get<any>(this.Api).toPromise();
  }

  addReviewFun(data:Object):any{
    return this.http.post(this.Api,data);
    // .toPromise()
    // .then((res:any)=>{
    //   alert("Review added..!");
    // })
    // .catch((err: any) => {
    //   alert("An unexpected error occured..!");
    //   console.log(err);
    //   return err;
    // });
  }
}
