import {Component,OnChanges} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {CookieService} from 'ngx-cookie-service';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError} from '@angular/router';
// import {LogoutService} from './../services/logout.service';
import {LoginService} from './../services/login.service';
// import {UserDataService} from './../services/user-data.service';
// import {RenewPaymentService} from './../services/renew-payment.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnChanges {

  public isLogin: boolean = false;
  public items: MenuItem[] = [];
  userexpiresOn:any;

  public cookieExists: boolean = false;

  constructor(private router: Router,private cookieService: CookieService,private login_api: LoginService,private _location: Location) {

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {              
          if(this.cookieService.check("userId")){
            this.cookieExists = true;
          }else{
            this.cookieExists = false;
          }
      }
  });
  }

  ngOnChanges() {
    
  }

  move(url:any){
    this.router.navigateByUrl("/"+url);
  }
}
