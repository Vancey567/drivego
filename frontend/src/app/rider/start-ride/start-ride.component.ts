import { Component, OnInit, ViewChild } from '@angular/core';
import {FormGroup,FormBuilder,Validators,NG_VALIDATORS} from "@angular/forms";
import {BookRideService} from './../../services/book-ride.service';
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
  public tripRequestBtn: boolean= false;
  minDate:any = new Date();
  displayModal:boolean = false;
  matchedTrips:any[] = [];
  
  constructor(private bookRideApi: BookRideService, private messageService: MessageService, private fb: FormBuilder,private router: Router,private cookieService: CookieService) { }

  ngOnInit(): void {

    // trip
    this.tripDetailsForm = this.fb.group(
      {
        source: ['',[Validators.required]],
        destination: ['',[Validators.required]],
        startDate: ['',[Validators.required]]
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

  get startDate(): any {
    return this.tripDetailsForm.get('startDate');
  }

  tripDetails():void{
    this.tripDetailsBtn = true;
    if(this.tripDetailsForm.valid) {
      let formdata: any = {
        "rider": this.cookieService.get('userId'),
        "source": this.source.value,
        "destination": this.destination.value,
        "preferredTripTime": this.startDate.value
      };      
      const ajax = this.bookRideApi.insertRideDetails(formdata);
      ajax.subscribe(
        (response: any) => {
          console.log(response);
          
          if(response.message == "Ride Created Successfully, Soon we will find a trip for you!!"){
            console.log(123);
            
            let formdata: any = {
              "riderId": this.cookieService.get('userId')
            };  
            const ajax = this.bookRideApi.searchRide(formdata);
            ajax.subscribe(
              (response: any) => {
                console.log(response);
                this.matchedTrips = response;
                console.log(this.matchedTrips);
                
                this.displayModal = true
                // if(response.rideData._id){
                //   const ajax = this.bookRideApi.searchRide(formdata);
                //   this.cookieService.set("dob",response.user.dob,365,undefined,undefined,true,'Strict');
                //   this.cookieService.set("isActive",response.user.isActivated,365,undefined,undefined,true,'Strict');
                //   this.cookieService.set("email",response.user.email,365,undefined,undefined,true,'Strict');
                //   this.cookieService.set("gender",response.user.gender,365,undefined,undefined,true,'Strict');
                //   this.cookieService.set("name",response.user.name,365,undefined,undefined,true,'Strict');
                //   this.cookieService.set("occupation",response.user.occupation,365,undefined,undefined,true,'Strict');
                //   this.messageService.add({severity:'success', summary:'Success', detail:'User Details Added Successfully'});
                //   // this.displayModal = false;
                //   this.router.navigateByUrl("/start-ride");
                // }
                // else{
                //   this.messageService.add({severity:'error', summary:'Error', detail:"Something went wrong! Please try again later."});
                // }
              },
              (error: any) => {
                this.messageService.add({severity:'error', summary:'Error', detail:error});
                console.log(error);
              }
            );
          }
          else{
            console.log(333);
            
            this.messageService.add({severity:'error', summary:'Error', detail:response.message});
          }
          this.tripDetailsBtn = false;
        },
        (error: any) => {
          this.messageService.add({severity:'error', summary:'Error', detail:error});
          console.log(error);
          this.tripDetailsBtn = false;
        }
      );
    }
  }

  requestDriver(driverId:any):void{
    this.tripRequestBtn = true;
    let formdata: any = {
      "riderId": this.cookieService.get('userId'),
      "driverId": driverId
    };      
    const ajax = this.bookRideApi.requestDriver(formdata);
    ajax.subscribe(
      (response: any) => {
        console.log(response);
        this.messageService.add({severity:'success', summary:'Success', detail:response.message});
        this.router.navigateByUrl("/history/rider");
        this.tripRequestBtn = false;
      },
      (error: any) => {
        this.messageService.add({severity:'error', summary:'Error', detail:error});
        console.log(error);
        this.tripRequestBtn = false;
      }
    );
  }

}
