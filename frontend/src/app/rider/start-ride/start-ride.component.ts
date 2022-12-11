import { Component, OnInit, ViewChild } from '@angular/core';
import {FormGroup,FormBuilder,Validators,NG_VALIDATORS} from "@angular/forms";
// import {LoginService} from '../../services/login.service';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-start-ride',
  templateUrl: './start-ride.component.html',
  styleUrls: ['./start-ride.component.scss'],
  providers: [CookieService,MessageService]
})
export class StartRideComponent implements OnInit {

  public tripDetailsForm: any;
  public tripDetailsBtn: boolean= false;
  minDate:any = new Date();

  constructor(private messageService: MessageService, private fb: FormBuilder,private router: Router,private cookieService: CookieService) { }

  ngOnInit(): void {

    // trip
    this.tripDetailsForm = this.fb.group(
      {
        source: ['',[Validators.required]],
        destination: ['',[Validators.required]],
        capacity: ['',[Validators.required]],
        startTime: ['',[Validators.required]]
      }
    );
  }

  // trip
  get source(): any {
    return this.tripDetailsForm.get('source');
  }

  get destination(): any {
    return this.tripDetailsForm.get('destination');
  }

  get tripCapacity(): any {
    return this.tripDetailsForm.get('capacity');
  }

  get startTime(): any {
    return this.tripDetailsForm.get('startTime');
  }

  tripDetails():void{
    this.tripDetailsBtn = true;
    if(this.tripDetailsForm.valid) {
      let formdata: any = new FormData();
      for(let key in this.tripDetailsForm.value) {
        formdata.append(key,this.tripDetailsForm.value[key]);
      }
      // const ajax = this.login_api.loginUser(this.formdata);
      // ajax.subscribe(
      //   (response: any) => {
      //     if(response.isLogged == true){
      //       // this.cookieService.set('mlo-test',response.token,365,undefined,undefined,true,'Strict');
      //       this.cookieService.set('isRight',btoa(response.isRight),365,undefined,undefined,true,'Strict');

      //       // check cookies is store or not

      //       this.showDialog('Successfully Login','Success');
      //       setTimeout(() => {
      //         this.router.navigateByUrl("/dashboard");
      //       },1000);
      //     }
      //     else{
      //       this.showDialog("Unable to login! Please try again later.",'Warning');
      //     }
          
      //     this.tripDetailsBtn = false;
      //   },
      //   (error: any) => {
      //     // 
      //     this.showDialog(error,'Warning');
      //     this.tripDetailsBtn = false;
      //   }
      // );
      this.messageService.add({severity:'success', summary:'Success', detail:'Vehicle Added Successfully'});
      this.router.navigateByUrl("/rider-list");
      this.tripDetailsBtn = false;
      formdata = new FormData();
    }
  }

  

}
