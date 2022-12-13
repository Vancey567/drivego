import { Injectable } from '@angular/core';
import {HttpClient,HttpErrorResponse} from '@angular/common/http';
import {Observable,throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {environment} from './../../environments/environment';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  private apiURL: string = environment.apiURL;
  constructor(private http: HttpClient,private cookieService: CookieService) { }

  private httpOptions: any = {
    withCredentials: true,
    credentials: "include",
  };

  // registerVehicle(formdata: any): Observable<any>{
  //   console.log(formdata);
  //   const ajax = this.http.post<any>(this.apiURL + '/registervehicle',formdata,this.httpOptions).pipe(catchError(this.handleError));
  //   return ajax;
  // }

  allRides(formdata: any): Observable<any>{
    // console.log(formdata);
    const ajax = this.http.post<any>(this.apiURL + '/allRides',formdata,this.httpOptions).pipe(catchError(this.handleError));
    return ajax;
  }
  
  allDrives(formdata: any): Observable<any>{
    // console.log(formdata);
    const ajax = this.http.post<any>(this.apiURL + '/allTrips',formdata,this.httpOptions).pipe(catchError(this.handleError));
    return ajax;
  }

  driverDetails(formdata: any): Observable<any>{
    // console.log(formdata);
    const ajax = this.http.post<any>(this.apiURL + '/driverDetails',formdata,this.httpOptions).pipe(catchError(this.handleError));
    return ajax;
  }

  riderDetails(formdata: any): Observable<any>{
    // console.log(formdata);
    const ajax = this.http.post<any>(this.apiURL + '/riderDetails',formdata,this.httpOptions).pipe(catchError(this.handleError));
    return ajax;
  }

  driverApproval(formdata: any): Observable<any>{
    // console.log(formdata);
    const ajax = this.http.post<any>(this.apiURL + '/driverApproval',formdata,this.httpOptions).pipe(catchError(this.handleError));
    return ajax;
  }

  startTrip(formdata: any): Observable<any>{
    // console.log(formdata);
    const ajax = this.http.post<any>(this.apiURL + '/startTrip',formdata,this.httpOptions).pipe(catchError(this.handleError));
    return ajax;
  }

  endTrip(formdata: any): Observable<any>{
    // console.log(formdata);
    const ajax = this.http.post<any>(this.apiURL + '/endTrip',formdata,this.httpOptions).pipe(catchError(this.handleError));
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
