import { Component, OnInit, ViewChild } from '@angular/core';
import {FormGroup,FormBuilder,Validators,NG_VALIDATORS} from "@angular/forms";
import {HistoryService} from './../../services/history.service';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.scss'],
  providers: [CookieService,MessageService]
})
export class DriverComponent implements OnInit {
  
  displayModal: boolean= false;
  acceptBtn: boolean= false;
  rejectBtn: boolean= false;
  allRides:any[] = [];
  currentDetails: any = {"_id":"63975839be7cccc2af42b968","rider":{"_id":"6395b1c7a61f92d4c095a32b","phone":"+917663825509","isActivated":true,"createdAt":"2022-12-11T10:32:39.564Z","updatedAt":"2022-12-11T11:26:06.097Z","__v":0,"dob":"2000-01-01T00:00:00.000Z","email":"dipandka@gmail.com","gender":"Male","name":"Dipanka Kalita","occupation":"Student","id":"6395b1c7a61f92d4c095a32b"},"source":"Nagaon","destination":"Ghy","preferredTripTime":"2022-12-12T17:35:01.533Z","luggage":false,"createdAt":"2022-12-12T16:35:05.178Z","updatedAt":"2022-12-12T16:35:05.178Z","__v":0}
  currentStatus:string = '';
  public verifyOTPForm: any;
  public verifyOTPBtn: boolean= false;
  public endTripBtn: boolean= false;

  constructor(private historyApi: HistoryService, private messageService: MessageService, private fb: FormBuilder,private router: Router,private cookieService: CookieService) { 
    this.allDrives();
  }

  ngOnInit(): void {
    this.verifyOTPForm = this.fb.group(
      {
        verifyOTP: ['',[Validators.required]]
      }
    );
  }

  get verifyOTPs(): any {
    return this.verifyOTPForm.get('verifyOTP');
  }


  allDrives(): void {
    this.allRides = [];
    let formdata: any = {
      "driverId": this.cookieService.get('userId')
    };
    const ajax = this.historyApi.allDrives(formdata);
    ajax.subscribe(
      (response: any) => {        
        if(response.length>0){
          for(let i=0; i<response.length; i++){
            let formdata: any = {
              "riderId": response[i].rider
            };            
            const ajax = this.historyApi.riderDetails(formdata);
            ajax.subscribe(
              (res: any) => {
                console.log(res);
                
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
    console.log(this.allRides);
    
  }

  detailsModel(details:any):void{
    this.displayModal = true;
    this.currentDetails = details;
    console.log("this.currentDetails",this.currentDetails);
  }

  driverApproval(status:any, riderId:any):void{
    if(status == "accepted"){
      this.acceptBtn = true;
      this.rejectBtn = false;
    }
    else{
      this.acceptBtn = false;
      this.rejectBtn = true;
    }
    
    let formdata: any = {
      "riderId": riderId,
      "driverId": this.cookieService.get('userId'),
      "status": status
    };
    const ajax = this.historyApi.driverApproval(formdata);
      ajax.subscribe(
        (response: any) => {
          if(response.message == "Sorry, Driver rejected your ride request!!"){
            this.messageService.add({severity:'error', summary:'Error', detail:"Declined successfully!"});
          }
          else if(response.message == "Problem sending OTP!!"){
            this.messageService.add({severity:'error', summary:'Error', detail:"Problem sending OTP!!"});
          }
          else if(response.message == "Problem finding trip for your!!"){
            this.messageService.add({severity:'error', summary:'Error', detail:"Problem finding trip for your!!"});
          }
          else {
            this.messageService.add({severity:'success', summary:'Success', detail:response.message});
            this.allDrives();
            this.displayModal = false;
          }
          if(status == "accepted"){
            this.acceptBtn = false;
            this.rejectBtn = false;
          }
          else{
            this.acceptBtn = false;
            this.rejectBtn = false;
          }
        },
        (error: any) => {
          this.messageService.add({severity:'error', summary:'Error', detail:error});
          console.log(error);
          if(status == "accepted"){
            this.acceptBtn = false;
            this.rejectBtn = false;
          }
          else{
            this.acceptBtn = false;
            this.rejectBtn = false;
          }
        }
      );
  }

  verifyOTP(riderId:any):void{
    this.verifyOTPBtn = true;
    if(this.verifyOTPForm.valid) {
      let formdata: any = {
        "otp": this.verifyOTPs.value,
        "tripId": "6399429c8345e69f3f871f69", 
        "riderId": riderId,
        "driverId": this.cookieService.get('userId')
      };
      const ajax = this.historyApi.startTrip(formdata);
      ajax.subscribe(
        (response: any) => {
          console.log(response);
          this.messageService.add({severity:'success', summary:'Success', detail:response.message});
          this.allDrives();
          this.displayModal = false;
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

  endTrip():void{
    this.endTripBtn = true;
    let formdata: any = {
      "tripId": "6399429c8345e69f3f871f69", 
    };
    const ajax = this.historyApi.endTrip(formdata);
    ajax.subscribe(
      (response: any) => {
        console.log(response);
        this.messageService.add({severity:'success', summary:'Success', detail:response.message});
        this.allDrives();
        this.displayModal = false;
        this.endTripBtn = false;
      },
      (error: any) => {
        this.messageService.add({severity:'error', summary:'Error', detail:error});
        console.log(error);
        this.endTripBtn = false;
      }
    );
  }
}
