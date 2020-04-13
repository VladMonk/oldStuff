import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from "angular2-flash-messages";
import { CheckRegDataService } from "../check-reg-data.service";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.css']
})
export class RegComponent implements OnInit {

  firstname: String;
  lastname: String;
  email: String;
  password: String;

  constructor(
    private checkRegData: CheckRegDataService,
    private flashMessage: FlashMessagesService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  submitRegisterData(){
    const user = {
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      password: this.password
    };
    const link = "http://localhost:3000/auth/reg";

    //запихни в один метод это же пиздос
    if(!this.checkRegData.checkField(user.firstname)){
      this.flashMessage.show("Please, input first name", {
        cssClass: "alert-danger",
        time: 3000
      });
      return false;
    }
    if(!this.checkRegData.checkField(user.lastname)){
      this.flashMessage.show("Please, input last name", {
        cssClass: "alert-danger",
        time: 3000
      });
      return false;
    }
    if(!this.checkRegData.checkField(user.email)){
      this.flashMessage.show("Please, input email", {
        cssClass: "alert-danger",
        time: 3000
      });
      return false;
    }
    if(!this.checkRegData.checkField(user.password)){
      this.flashMessage.show("Please, input password", {
        cssClass: "alert-danger",
        time: 3000
      });
      return false;
    }
    ///////////////////////////////////////////////////


    this.authService.postUser(user, link).subscribe(data => {
    //this.authService.postClient(user, link).subscribe(data => {
      if(!data.success){
        this.flashMessage.show(data.msg, {
          cssClass: "alert-danger",
          time: 3000
        });
        this.router.navigate(["/auth/reg"]);
      } else {
        this.flashMessage.show(data.msg, {
          cssClass: "alert-success",
          time: 3000
        });
        this.router.navigate(["/auth/log"]);
      }
    });
  }
}
