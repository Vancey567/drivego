import { Component, OnInit, ViewChild } from '@angular/core';
import {FormGroup,FormBuilder,Validators,NG_VALIDATORS} from "@angular/forms";
import {VehicleService} from './../../services/vehicle.service';
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
  allVehicles:any;
  // trip
  tripModal: boolean= false;
  public tripDetailsForm: any;
  public tripDetailsBtn: boolean= false;
  vehicleType: any[] = [
    {name: '2-wheeler', value: '2-wheeler'},
    {name: '3-wheeler', value: '3-wheeler'},
    {name: '4-wheeler', value: '4-wheeler'},
    {name: 'Others', value: 'others'}
  ];

  constructor(private vehicleApi: VehicleService, private messageService: MessageService, private fb: FormBuilder,private router: Router,private cookieService: CookieService) { }

  ngOnInit(): void {
    this.allRegisterVehicle();
    this.registerVehicleForm = this.fb.group(
      {
        company: ['',[Validators.required]],
        model: ['',[Validators.required]],
        type: ['',[Validators.required]],
        vehicleNumber: ['',[Validators.required]],
        capacity: ['',[Validators.required]],
        color: ['',[Validators.required]],
        vehicleImg: ['',[Validators.required]]
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

  get company(): any {
    return this.registerVehicleForm.get('company');
  }

  get models(): any {
    return this.registerVehicleForm.get('model');
  }

  get type(): any {
    return this.registerVehicleForm.get('type');
  }

  get vehicleNumber(): any {
    return this.registerVehicleForm.get('vehicleNumber');
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

  get vehicleImg(): any {
    return this.registerVehicleForm.get('vehicleImg');
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
      let formdata: any = {
        "owner": this.cookieService.get('userId'),
        "vehicleNumber": this.vehicleNumber.value,
        "company": this.company.value,
        "model": this.model.value,
        "type": this.type.value,
        "capacity": this.capacity.value,
        "color": this.color.value,
        // "vehicleImg": this.vehicleImg.value
      };
      const ajax = this.vehicleApi.registerVehicle(formdata);
      ajax.subscribe(
        (response: any) => {
          console.log(response);
          this.messageService.add({severity:'success', summary:'Success', detail:response.message});
          this.displayModal = false;
          this.registerVehicleBtn = false;
          this.allRegisterVehicle();
        },
        (error: any) => {
          console.log(error);
          this.messageService.add({severity:'error', summary:'Error', detail:error});
          this.registerVehicleBtn = false;
        }
      );
    }
  }

  allRegisterVehicle(): void {
    let formdata: any = {
      "ownerId": this.cookieService.get('userId')
    };
    const ajax = this.vehicleApi.allVehicle(formdata);
    ajax.subscribe(
      (response: any) => {
        console.log(response);
        
        this.allVehicles = response.vehicles;
        console.log(this.allVehicles);
        
        // this.allCategories = response.data;
      },
      (error: any) => {
        console.log(error);
        
        // this.messageService.add({severity: 'error',summary: 'Error',detail: error});
      }
    );
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
      this.tripModal = false;
      this.tripDetailsBtn = false;
      formdata = new FormData();
    }
  }

  tripStartModal(vehicleId:any):void{
    this.tripModal = true;
  }

}
