import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from "angular2-flash-messages";
import { CheckRegDataService } from "../check-reg-data.service";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

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

  submitLoginData(){
    const user = {
      email: this.email,
      password: this.password
    };
    const link = "http://localhost:3000/auth/log";


    //запихни в один метод это же пиздос
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
      } else {
        this.router.navigate(["/account/", data.user.id]);
        this.authService.storeUser(data.token, data.user);
      }
    });
  }
}
