import { Component, OnInit, ViewChild } from '@angular/core';
import {FormGroup,FormBuilder,Validators,NG_VALIDATORS} from "@angular/forms";
import {StartTripService} from './../../services/start-trip.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.scss'],
  providers: [CookieService,MessageService]
})
export class TripDetailsComponent implements OnInit {

  public tripDetailsForm: any;
  public tripDetailsBtn: boolean= false;
  minDate:any = new Date();
  vehicleId:any;

  constructor(private startTripApi: StartTripService, private _activatedRoute: ActivatedRoute,private messageService: MessageService, private fb: FormBuilder,private router: Router,private cookieService: CookieService) { }

  ngOnInit(): void {
    // vehicle id
    this._activatedRoute.paramMap.subscribe(params => {
      const vehicleId = params.get('id');
      this.vehicleId = vehicleId;
      console.log("this.vehicleId",this.vehicleId);
      
    });

    // trip
    this.tripDetailsForm = this.fb.group(
      {
        source: ['',[Validators.required]],
        destination: ['',[Validators.required]],
        startDate: ['',[Validators.required]],
        availableSeats: ['',[Validators.required]],
        fare: ['',[Validators.required]],
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

  get availableSeats(): any {
    return this.tripDetailsForm.get('availableSeats');
  }

  get fare(): any {
    return this.tripDetailsForm.get('fare');
  }

  tripDetails():void{
    this.tripDetailsBtn = true;
    if(this.tripDetailsForm.valid) {
      let formdata: any = {
        "driver": this.cookieService.get('userId'),
        "vehicle": this.vehicleId,
        "source": this.source.value,
        "destination": this.destination.value,
        "expectedStartTime": this.startDate.value,
        "availableSeats": this.availableSeats.value,
        "fare": this.fare.value,
      };      
      const ajax = this.startTripApi.insertripDetails(formdata);
      ajax.subscribe(
        (response: any) => {
          console.log(response);
          
          if(response.message == "Trip Created Successfully!!"){
            this.messageService.add({severity:'success', summary:'Success', detail:'Trip Created Successfully'});
            this.router.navigateByUrl("/history/driver");
          }
          else{
            this.messageService.add({severity:'error', summary:'Error', detail:"Something went wrong! Please try again later."});
          }
          this.tripDetailsBtn = false;
        },
        (error: any) => {
          // this.messageService.add({severity:'error', summary:'Error', detail:error});
          console.log(error);
          this.tripDetailsBtn = false;
        }
      );
    }
  }


}
