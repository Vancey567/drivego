import { Component, OnInit, ViewChild } from '@angular/core';
import {FormGroup,FormBuilder,Validators,NG_VALIDATORS} from "@angular/forms";
// import {LoginService} from '../../services/login.service';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.scss'],
  providers: [CookieService,MessageService]
})
export class TripDetailsComponent implements OnInit {

  constructor(private messageService: MessageService, private fb: FormBuilder,private router: Router,private cookieService: CookieService) { }

  ngOnInit(): void {

  }


}
