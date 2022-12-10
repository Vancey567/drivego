import { Component, OnInit, ViewChild } from '@angular/core';
import {FormGroup,FormBuilder,Validators,NG_VALIDATORS} from "@angular/forms";
import {LoginService} from './../services/login.service';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {MessageService} from 'primeng/api';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [CookieService,MessageService],
})
export class LoginComponent implements OnInit {
  @ViewChild('loginFormTag') private loginFormTag: any;

  public loginForm: any;
  public loginBtn: boolean= false;

  public verifyOTPForm: any;
  public verifyOTPBtn: boolean= false;
  public OTPFormDisplay: boolean= false;
  public respHash:any;
  public resPhone:any;

  constructor(private login_api: LoginService, private messageService: MessageService, private fb: FormBuilder,private router: Router,private cookieService: CookieService) { }

  ngOnInit(): void {
    this.OTPFormDisplay = false;
    this.loginForm = this.fb.group(
      {
        phone: ['',[Validators.required]]
      }
    );

    this.verifyOTPForm = this.fb.group(
      {
        verifyOTP: ['',[Validators.required]]
      }
    );
  }

  get phone(): any {
    return this.loginForm.get('phone');
  }

  get verifyOTPs(): any {
    return this.verifyOTPForm.get('verifyOTP');
  }

  login():void{
    this.loginBtn = true;
    if(this.loginForm.valid) {  
      const ajax = this.login_api.loginUser(this.loginForm.value);
      ajax.subscribe(
        (response: any) => {
          console.log(response);
          
          if(response.hash){
            this.respHash = response.hash;
            this.resPhone = response.phone;
            this.messageService.add({severity:'success', summary:'Success', detail:'OTP Sent Successfully. OTP is: '+response.otp});
            this.OTPFormDisplay = true;
            this.loginBtn = false;
          }
          else{
            this.messageService.add({severity:'error', summary:'Error', detail:"Something went wrong! Please try again later."});
            this.loginBtn = false;
          }
          
          this.loginBtn = false;
        },
        (error: any) => {
          this.messageService.add({severity:'error', summary:'Error', detail:error});
          console.log(error);
          this.loginBtn = false;
        }
      );
    }
  }

  verifyOTP():void{
    this.verifyOTPBtn = true;
    if(this.verifyOTPForm.valid) {
      let formdata: any = {
        "otp": this.verifyOTPs.value,
        "hash": this.respHash,
        "phone": this.resPhone
      };
      const ajax = this.login_api.verifyOTP(formdata);
      ajax.subscribe(
        (response: any) => {
          console.log(response);
          
          if(response.otpValid){
            this.cookieService.set("userId",response.user.id,365,undefined,undefined,true,'Strict');
            this.cookieService.set("isActive",response.user.isActivated,365,undefined,undefined,true,'Strict');
            this.cookieService.set("userPhone",response.user.phone,365,undefined,undefined,true,'Strict');
            this.messageService.add({severity:'success', summary:'Success', detail:'Login Successfully'});
            setTimeout(() => {
              this.router.navigateByUrl("/user-details");
              this.OTPFormDisplay = false;
              this.verifyOTPBtn = false;
            },1000);
            this.OTPFormDisplay = false;
          }
          else{
            this.messageService.add({severity:'error', summary:'Error', detail:"Something went wrong! Please try again later."});
          }
          this.verifyOTPBtn = false;
        },
        (error: any) => {
          this.messageService.add({severity:'error', summary:'Error', detail:error});
          console.log(error);
          this.verifyOTPBtn = false;
        }
      );
    }
  }

}
