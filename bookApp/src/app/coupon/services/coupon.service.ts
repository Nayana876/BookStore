import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CouponService {
  public API="https://localhost:44390/api/Coupons/";
  constructor(private http:HttpClient) { }

  getCoupons():Observable<any[]>{
    return this.http.get<any>(this.API);
  }

  async getCouponById(id: any): Promise<any> {
    return this.http.get(this.API + id).toPromise();
  }

  deleteCouponById(id: string): Observable<any> {
    return this.http.delete(this.API + id);    
  }

  addCouponFun(data:Object,router:Router):Observable<any>{
    return this.http.post(this.API,data);
  }
  updateCoupon(updateData: any,router:Router): any {
    console.log(updateData); // before submitting to the REST API
    return this.http.put(this.API + updateData.CouponId, updateData)
      // .toPromise()
      // .then((res: any) => {
      //   alert("Updated..!");
      //   router.navigateByUrl('coupon');
      //   console.log(res);
      //   return res;
      // })
      // .catch((err: any) => {
      //   alert("Encountered an error");
      //   console.log(err);
      //   return err;
      // })
      // .finally(() => {
      //   console.log('It is over!');
      // });
  }

}
