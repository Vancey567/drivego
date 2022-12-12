import { Component, OnInit, ViewChild } from '@angular/core';
import {FormGroup,FormBuilder,Validators,NG_VALIDATORS} from "@angular/forms";
import {VehicleService} from './../../services/vehicle.service';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-rider',
  templateUrl: './rider.component.html',
  styleUrls: ['./rider.component.scss'],
  providers: [CookieService,MessageService]
})
export class RiderComponent implements OnInit {

  displayModal: boolean= false;
  public registerVehicleForm: any;
  public registerVehicleBtn: boolean= false;
  allVehicles:any;
  // trip
  tripModal: boolean= false;
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
      },
      (error: any) => {
        console.log(error);
        
        // this.messageService.add({severity: 'error',summary: 'Error',detail: error});
      }
    );
  }

  tripStartModal(vehicleId:any):void{
    this.router.navigateByUrl("/trip-details/"+vehicleId);
  }

}
