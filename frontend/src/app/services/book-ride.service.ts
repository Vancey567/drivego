import { Injectable } from '@angular/core';
import {HttpClient,HttpErrorResponse} from '@angular/common/http';
import {Observable,throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {environment} from './../../environments/environment';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class BookRideService {

  private apiURL: string = environment.apiURL;
  constructor(private http: HttpClient,private cookieService: CookieService) { }

  private httpOptions: any = {
    withCredentials: true,
    credentials: "include",
  };

  // checkLogin(): Observable<any> {
  //   const ajax = this.http.get<any>(this.apiURL + '/auto',this.httpOptions);
  //   return ajax;
  // }

  // used to auto login user and user verified after login
  // autoLogin(): Observable<any> {
  //   const ajax = this.http.get<any>(this.apiURL + '/dashboard',this.httpOptions).pipe(catchError(this.handleError));
  //   return ajax;
  // }

  insertRideDetails(formdata: any): Observable<any>{
    const ajax = this.http.post<any>(this.apiURL + '/rider/createRide',formdata,this.httpOptions).pipe(catchError(this.handleError));
    return ajax;
  }

  searchRide(formdata: any): Observable<any>{
    console.log(formdata);
    const ajax = this.http.post<any>(this.apiURL + '/findTrip',formdata,this.httpOptions).pipe(catchError(this.handleError));
    return ajax;
  }

  requestDriver(formdata: any): Observable<any>{
    console.log(formdata);
    const ajax = this.http.post<any>(this.apiURL + '/requestDriver',formdata,this.httpOptions).pipe(catchError(this.handleError));
    return ajax;
  }


  handleError(error: HttpErrorResponse): Observable<any> {
    let errorMsg = '';
    if(error.error instanceof ErrorEvent) {
      errorMsg = "Network error! Please try again later.";
    } else {
      errorMsg = error.error.message;
    }
    return throwError(errorMsg);
  }
}
