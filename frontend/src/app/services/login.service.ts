import { Injectable } from '@angular/core';
import {HttpClient,HttpErrorResponse} from '@angular/common/http';
import {Observable,throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {environment} from './../../environments/environment';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
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

  loginUser(formdata: any): Observable<any>{
    // console.log(formdata);
    
    const ajax = this.http.post<any>(this.apiURL + '/sendotp',formdata,this.httpOptions).pipe(catchError(this.loginHandleError));
    return ajax;
  }

  verifyOTP(formdata: any): Observable<any>{
    console.log(formdata);
    
    const ajax = this.http.post<any>(this.apiURL + '/verifyotp',formdata,this.httpOptions).pipe(catchError(this.loginHandleError));
    return ajax;
  }

  loginHandleError(error: HttpErrorResponse): Observable<any> {
    let errorMsg = '';
    if(error.error instanceof ErrorEvent) {
      errorMsg = "Network error! Please try again later.";
    } else {
      errorMsg = error.error.message;
    }
    return throwError(errorMsg);
  }

}
