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
  referUserList: any[] = [];
  constructor(private refereApi: ReferService, private messageService: MessageService, private fb: FormBuilder,private router: Router,private cookieService: CookieService) { }

  ngOnInit(): void {
    this.allreferUser();
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
        "referredPhone": "+91"+(this.mobile.value).toString()
      };
      const ajax = this.refereApi.addRefer(formdata);
      ajax.subscribe(
        (response: any) => {
          console.log(response);
          this.messageService.add({severity:'success', summary:'Success', detail:"Refer Sent Successfully."});
          this.referForm.reset();
          this.referAddBtn = false;
          this.allreferUser();
        },
        (error: any) => {
          console.log(error);
          this.messageService.add({severity:'error', summary:'Error', detail:error});
          this.referAddBtn = false;
        }
      );
    }
  }

  allreferUser(){
    let formdata: any = {
      "userId": this.cookieService.get('userId')
    };
    const ajax = this.refereApi.allRefer(formdata);
    ajax.subscribe(
      (response: any) => {
        this.referUserList = response;
      },
      (error: any) => {
        console.log(error);
        // this.messageService.add({severity:'warning', summary:'Warning', detail:error});
      }
    );
  }
}
