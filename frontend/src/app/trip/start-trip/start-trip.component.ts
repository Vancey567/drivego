import { Component, OnInit, ViewChild } from '@angular/core';
import {FormGroup,FormBuilder,Validators,NG_VALIDATORS} from "@angular/forms";
// import {LoginService} from '../../services/login.service';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-start-trip',
  templateUrl: './start-trip.component.html',
  styleUrls: ['./start-trip.component.scss'],
  providers: [CookieService,MessageService]
})
export class StartTripComponent implements OnInit {
  displayModal: boolean= false;
  public registerVehicleForm: any;
  public registerVehicleBtn: boolean= false;

  // trip
  tripModal: boolean= false;
  public tripDetailsForm: any;
  public tripDetailsBtn: boolean= false;

  constructor(private messageService: MessageService, private fb: FormBuilder,private router: Router,private cookieService: CookieService) { }

  ngOnInit(): void {
    // this.displayModal = true;
    this.registerVehicleForm = this.fb.group(
      {
        vehicleNo: ['',[Validators.required]],
        model: ['',[Validators.required]],
        capacity: ['',[Validators.required]],
        color: ['',[Validators.required]]
      }
    );

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

  get vehicleNo(): any {
    return this.registerVehicleForm.get('vehicleNo');
  }

  get model(): any {
    return this.registerVehicleForm.get('model');
  }

  get capacity(): any {
    return this.registerVehicleForm.get('capacity');
  }

  get color(): any {
    return this.registerVehicleForm.get('color');
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

  registerVehicle():void{
    this.registerVehicleBtn = true;
    if(this.registerVehicleForm.valid) {
      let formdata: any = new FormData();
      for(let key in this.registerVehicleForm.value) {
        formdata.append(key,this.registerVehicleForm.value[key]);
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
          
      //     this.registerVehicleBtn = false;
      //   },
      //   (error: any) => {
      //     // 
      //     this.showDialog(error,'Warning');
      //     this.registerVehicleBtn = false;
      //   }
      // );
      this.messageService.add({severity:'success', summary:'Success', detail:'Vehicle Added Successfully'});
      this.displayModal = false;
      this.registerVehicleBtn = false;
      formdata = new FormData();
    }
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
          
      //     this.tripDetailsBtn = false;
      //   },
      //   (error: any) => {
      //     // 
      //     this.showDialog(error,'Warning');
      //     this.tripDetailsBtn = false;
      //   }
      // );
      this.messageService.add({severity:'success', summary:'Success', detail:'Vehicle Added Successfully'});
      this.tripModal = false;
      this.tripDetailsBtn = false;
      formdata = new FormData();
    }
  }

  

}
