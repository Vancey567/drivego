import { Injectable } from '@angular/core';
import {HttpClient,HttpErrorResponse} from '@angular/common/http';
import {Observable,throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {environment} from './../../environments/environment';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ReferService {

  private apiURL: string = environment.apiURL;
  constructor(private http: HttpClient,private cookieService: CookieService) { }

  private httpOptions: any = {
    withCredentials: true,
    credentials: "include",
  };

  addRefer(formdata: any): Observable<any>{
    console.log(formdata);
    const ajax = this.http.post<any>(this.apiURL + '/referral',formdata,this.httpOptions).pipe(catchError(this.handleError));
    return ajax;
  }

  allRefer(formdata: any): Observable<any>{
    console.log(formdata);
    const ajax = this.http.post<any>(this.apiURL + '/referredUsers',formdata,this.httpOptions).pipe(catchError(this.handleError));
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
