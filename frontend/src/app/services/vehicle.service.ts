import { Injectable } from '@angular/core';
import {HttpClient,HttpErrorResponse} from '@angular/common/http';
import {Observable,throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {environment} from './../../environments/environment';
import {CookieService} from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private apiURL: string = environment.apiURL;
  constructor(private http: HttpClient,private cookieService: CookieService) { }

  private httpOptions: any = {
    withCredentials: true,
    credentials: "include",
  };

  registerVehicle(formdata: any): Observable<any>{
    console.log(formdata);
    const ajax = this.http.post<any>(this.apiURL + '/registervehicle',formdata,this.httpOptions).pipe(catchError(this.handleError));
    return ajax;
  }

  allVehicle(formdata: any): Observable<any>{
    console.log(formdata);
    const ajax = this.http.post<any>(this.apiURL + '/user/vehicles',formdata,this.httpOptions).pipe(catchError(this.handleError));
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
