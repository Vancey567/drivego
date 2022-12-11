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
  minDate:any = new Date();

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
        "preferredTripDate": this.startDate.value
      };
      console.log(formdata);
      
      const ajax = this.bookRideApi.searchRide(formdata);
      ajax.subscribe(
        (response: any) => {
          console.log(response);
          
          // if(response.message == "User Registered"){
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
