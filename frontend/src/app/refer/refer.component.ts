import { Component, OnInit, ViewChild } from '@angular/core';
import {FormGroup,FormBuilder,Validators,NG_VALIDATORS} from "@angular/forms";
import {ReferService} from './../services/refer.service';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {MessageService} from 'primeng/api';


@Component({
  selector: 'app-refer',
  templateUrl: './refer.component.html',
  styleUrls: ['./refer.component.scss'],
  providers: [CookieService,MessageService]
})
export class ReferComponent implements OnInit {
  public referForm: any;
  public referAddBtn: boolean= false;
  referUserList: any[] = [
    {
      'phone': 7662547789,
      'date': "12 Jan 2022",
      'status': 'Active'
    },
    {
      'phone': 8562547789,
      'date': "30 Jan 2022",
      'status': 'Active'
    },
    {
      'phone': 8862547789,
      'date': "12 Feb 2022",
      'status': 'Pending'
    }
  ];
  constructor(private refereApi: ReferService, private messageService: MessageService, private fb: FormBuilder,private router: Router,private cookieService: CookieService) { }

  ngOnInit(): void {

    this.referForm = this.fb.group(
      {
        mobile: ['',[Validators.required]]
      }
    );
  }

  get mobile(): any {
    return this.referForm.get('mobile');
  }

  addNewRefer():void{
    this.referAddBtn = true;
    if(this.referForm.valid) {
      let formdata: any = {
        "userId": this.cookieService.get('userId'),
        "referredPhone": this.mobile.value
      };
      const ajax = this.refereApi.addRefer(formdata);
      ajax.subscribe(
        (response: any) => {
          console.log(response);
          // this.messageService.add({severity:'success', summary:'Success', detail:response.message});
          // this.displayModal = false;
          this.referAddBtn = false;
          // this.allRegisterVehicle();
        },
        (error: any) => {
          console.log(error);
          // this.messageService.add({severity:'error', summary:'Error', detail:error});
          this.referAddBtn = false;
        }
      );
    }
  }
}
