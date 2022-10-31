import { Component, OnInit, ViewChild } from '@angular/core';
import {FormGroup,FormBuilder,Validators,NG_VALIDATORS} from "@angular/forms";
// import {LoginService} from '../../services/login.service';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
  providers: [CookieService,MessageService]
})
export class UserDetailComponent implements OnInit {
  displayModal: boolean= false;
  public userDetailsForm: any;
  public userDetailsBtn: boolean= false;

  constructor(private messageService: MessageService, private fb: FormBuilder,private router: Router,private cookieService: CookieService) { }

  ngOnInit(): void {
    this.displayModal = true;
    this.userDetailsForm = this.fb.group(
      {
        name: ['',[Validators.required]],
        email: ['',[Validators.required]],
        dob: ['',[Validators.required]],
        gender: ['',[Validators.required]]
      }
    );
  }

  get name(): any {
    return this.userDetailsForm.get('name');
  }

  get email(): any {
    return this.userDetailsForm.get('email');
  }

  get dob(): any {
    return this.userDetailsForm.get('dob');
  }

  get gender(): any {
    return this.userDetailsForm.get('gender');
  }

  userDetails():void{
    this.userDetailsBtn = true;
    if(this.userDetailsForm.valid) {
      let formdata: any = new FormData();
      for(let key in this.userDetailsForm.value) {
        formdata.append(key,this.userDetailsForm.value[key]);
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
          
      //     this.userDetailsBtn = false;
      //   },
      //   (error: any) => {
      //     // 
      //     this.showDialog(error,'Warning');
      //     this.userDetailsBtn = false;
      //   }
      // );
      this.messageService.add({severity:'success', summary:'Success', detail:'User Details Added Successfully'});
      this.displayModal = false;
      this.userDetailsBtn = false;
      formdata = new FormData();
    }
  }

  start(url:any):void{
    this.router.navigateByUrl("/"+url);
  }

}
