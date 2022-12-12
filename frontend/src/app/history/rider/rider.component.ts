import { Component, OnInit, ViewChild } from '@angular/core';
import {FormGroup,FormBuilder,Validators,NG_VALIDATORS} from "@angular/forms";
import {HistoryService} from './../../services/history.service';
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
  allRides:any[] = [];
  currentDetails: any = {"_id":"639756d4be7cccc2af42b92a","driver":"63959411a61f92d4c095a311","vehicle":{"_id":"6395986fa61f92d4c095a31b","owner":"63959411a61f92d4c095a311","vehicleNumber":"AS01EF9087","company":"SUZUKI","model":"XUV","type":"4-wheeler","capacity":4,"color":"RED","activated":false,"createdAt":"2022-12-11T08:44:31.593Z","updatedAt":"2022-12-11T08:44:31.593Z","__v":0,"id":"6395986fa61f92d4c095a31b"},"coRiders":[],"availableSeats":1,"source":"Nagaon","destination":"Ghy","expectedStartTime":"2022-12-12T17:28:58.099Z","fare":"1000","createdAt":"2022-12-12T16:29:08.757Z","updatedAt":"2022-12-12T16:29:08.757Z","__v":0}
  currentStatus:string = '';

  constructor(private historyApi: HistoryService, private messageService: MessageService, private fb: FormBuilder,private router: Router,private cookieService: CookieService) { 
    this.allRegisterVehicle();
  }

  ngOnInit(): void {
    console.log(this.currentDetails);
    
  }

  allRegisterVehicle(): void {
    let formdata: any = {
      "riderId": this.cookieService.get('userId')
    };
    const ajax = this.historyApi.allRides(formdata);
    ajax.subscribe(
      (response: any) => {        
        if(response.length>0){
          for(let i=0; i<response.length; i++){
            let formdata: any = {
              "driverId": response[i].driver
            };            
            const ajax = this.historyApi.driverDetails(formdata);
            ajax.subscribe(
              (res: any) => {
                res['status'] = response[i].status;
                this.allRides.push(res);
              },
              (error: any) => {
                console.log(error);
              }
            );
          }
        }
        else{
          this.messageService.add({severity: 'error',summary: 'Error',detail: "No previous ride found"});
        }        
      },
      (error: any) => {
        console.log(error);
        this.messageService.add({severity: 'error',summary: 'Error',detail: error});
      }
    );
  }

  detailsModel(details:any):void{
    this.displayModal = true;
    this.currentDetails = details;
    console.log("this.currentDetails",this.currentDetails);
  }

}
