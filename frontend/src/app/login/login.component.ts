import { Component, OnInit, ViewChild } from '@angular/core';
import {FormGroup,FormBuilder,Validators,NG_VALIDATORS} from "@angular/forms";
// import {LoginService} from '../../services/login.service';
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

  constructor(private messageService: MessageService, private fb: FormBuilder,private router: Router,private cookieService: CookieService) { }

  ngOnInit(): void {
    this.OTPFormDisplay = false;
    this.loginForm = this.fb.group(
      {
        mobile_number: ['',[Validators.required]]
      }
    );

    this.verifyOTPForm = this.fb.group(
      {
        verifyOTP: ['',[Validators.required]]
      }
    );
  }

  get mobile_number(): any {
    return this.loginForm.get('mobile_number');
  }

  get verifyOTPs(): any {
    return this.verifyOTPForm.get('verifyOTPs');
  }

  login():void{
    this.loginBtn = true;
    if(this.loginForm.valid) {
      let formdata: any = new FormData();
      for(let key in this.loginForm.value) {
        formdata.append(key,this.loginForm.value[key]);
      }
      // const ajax = this.login_api.loginUser(this.formdata);
      // ajax.subscribe(
      //   (response: any) => {
      //     if(response.isLogged == true){
      //       // this.cookieService.set('mlo-test',response.token,1,undefined,undefined,true,'Strict');
      //       this.cookieService.set('isRight',btoa(response.isRight),1,undefined,undefined,true,'Strict');

      //       // check cookies is store or not

      //       this.showDialog('Successfully Login','Success');
      //       setTimeout(() => {
      //         this.router.navigateByUrl("/dashboard");
      //       },1000);
      //     }
      //     else{
      //       this.showDialog("Unable to login! Please try again later.",'Warning');
      //     }
          
      //     this.loginBtn = false;
      //   },
      //   (error: any) => {
      //     // 
      //     this.showDialog(error,'Warning');
      //     this.loginBtn = false;
      //   }
      // );
      this.messageService.add({severity:'success', summary:'Success', detail:'OTP Sent Successfully'});
      this.OTPFormDisplay = true;
      this.loginBtn = false;
      formdata = new FormData();
    }
  }

  verifyOTP():void{
    this.verifyOTPBtn = true;
    if(this.verifyOTPForm.valid) {
      let formsdata: any = new FormData();
      for(let key in this.verifyOTPForm.value) {
        formsdata.append(key,this.verifyOTPForm.value[key]);
      }
      // const ajax = this.login_api.loginUser(this.formdata);
      // ajax.subscribe(
      //   (response: any) => {
      //     if(response.isLogged == true){
      //       // this.cookieService.set('mlo-test',response.token,1,undefined,undefined,true,'Strict');
      //       this.cookieService.set('isRight',btoa(response.isRight),1,undefined,undefined,true,'Strict');

      //       // check cookies is store or not

      //       this.showDialog('Successfully Login','Success');
      //       setTimeout(() => {
      //         this.router.navigateByUrl("/dashboard");
      //       },1000);
      //     }
      //     else{
      //       this.showDialog("Unable to login! Please try again later.",'Warning');
      //     }
          
      //     this.loginBtn = false;
      //   },
      //   (error: any) => {
      //     // 
      //     this.showDialog(error,'Warning');
      //     this.loginBtn = false;
      //   }
      // );
      this.messageService.add({severity:'success', summary:'Success', detail:'Login Successfully'});
      setTimeout(() => {
        this.router.navigateByUrl("/user-details");
        this.OTPFormDisplay = false;
        this.verifyOTPBtn = false;
      },1000);
      formsdata = new FormData();
    }
  }

}
