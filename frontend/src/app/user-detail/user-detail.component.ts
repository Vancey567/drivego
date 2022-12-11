import { Component, OnInit, ViewChild } from '@angular/core';
import {FormGroup,FormBuilder,Validators,NG_VALIDATORS} from "@angular/forms";
import {UserDetailsService} from './../services/user-details.service';
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
  // displayModal: boolean= false;
  public userDetailsForm: any;
  public userGender: any[] = [
    {name: 'Male', value: 'Male'},
    {name: 'Female', value: 'Female'},
  ];
  public userDetailsBtn: boolean= false;

  constructor(private userApi: UserDetailsService, private messageService: MessageService, private fb: FormBuilder,private router: Router,private cookieService: CookieService) { }

  ngOnInit(): void {
    if(this.cookieService.get('isActive') == "true"){
      this.router.navigateByUrl("/start-ride");
    }
    this.userDetailsForm = this.fb.group(
      {
        name: ['',[Validators.required]],
        email: ['',[Validators.required]],
        dob: ['',[Validators.required]],
        occupation: ['',[Validators.required]],
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

  get occupation(): any {
    return this.userDetailsForm.get('occupation');
  }

  get gender(): any {
    return this.userDetailsForm.get('gender');
  }

  userDetails():void{
    this.userDetailsBtn = true;
    if(this.userDetailsForm.valid) {
      let formdata: any = {
        "userId": this.cookieService.get('userId'),
        "name": this.name.value,
        "gender": this.gender.value,
        "dob": this.dob.value,
        "email": this.email.value,
        "occupation": this.occupation.value
      };
      const ajax = this.userApi.userDetails(formdata);
      ajax.subscribe(
        (response: any) => {
          console.log(response);
          
          if(response.message == "User Registered"){
            this.cookieService.set("dob",response.user.dob,365,undefined,undefined,true,'Strict');
            this.cookieService.set("isActive",response.user.isActivated,365,undefined,undefined,true,'Strict');
            this.cookieService.set("email",response.user.email,365,undefined,undefined,true,'Strict');
            this.cookieService.set("gender",response.user.gender,365,undefined,undefined,true,'Strict');
            this.cookieService.set("name",response.user.name,365,undefined,undefined,true,'Strict');
            this.cookieService.set("occupation",response.user.occupation,365,undefined,undefined,true,'Strict');
            this.messageService.add({severity:'success', summary:'Success', detail:'User Details Added Successfully'});
            // this.displayModal = false;
            this.router.navigateByUrl("/start-ride");
          }
          else{
            this.messageService.add({severity:'error', summary:'Error', detail:"Something went wrong! Please try again later."});
          }
          this.userDetailsBtn = false;
        },
        (error: any) => {
          this.messageService.add({severity:'error', summary:'Error', detail:error});
          console.log(error);
          this.userDetailsBtn = false;
        }
      );
    }
  }

  start(url:any):void{
    this.router.navigateByUrl("/"+url);
  }

}
