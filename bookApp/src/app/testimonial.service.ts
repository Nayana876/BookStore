import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class TestimonialService {

  constructor(private http:HttpClient) { }


  REST_API_URL="https://localhost:44390/api/Testimonials";

  REST_API_URL1="https://localhost:44390/api/Categories";



  // getting all testimonial from db
  
  getTestimonials():any{
    console.log("inside getUsers");
  
  return this.http.get(this.REST_API_URL)
     .pipe(map( (res:any) => {
       //console.log(res);
       return res;
     }));
    
    } 

getCategoryForDropdown():any{
  return this.http.get(this.REST_API_URL1)
  .pipe(map( (res1:any) => {
    //console.log(res1);
    return res1;
  }));
}

addTest(testimonialData:any):any{
  return this.http.post(this.REST_API_URL,testimonialData);
  
}


}


