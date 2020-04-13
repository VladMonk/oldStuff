import { Component, OnInit } from '@angular/core';
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  currentUserId:string;
  currentUserFirstName:string;
  currentUserLastName:string;
  currentUserPhoto:string;
  link:string;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    if(authService.isLogged()){
      this.currentUserId = JSON.parse(localStorage.getItem("user")).id;
    }
  }

  ngOnInit() {
    this.link = "http://localhost:3000/account/" + this.currentUserId + "/head";
    const curUser = {
      curId: this.currentUserId
    };
    this.authService.postUser(curUser, this.link).subscribe(data => {
      if(!data.success){
        console.log(data);
      } else {
        this.currentUserFirstName = data.curUser.curFirstName;
        this.currentUserLastName = data.curUser.curLastName;
        this.currentUserPhoto = data.curUser.curUserPhoto;
      }
    });
  }

  logOutUser(){
    this.authService.logout();
    this.router.navigate(["/auth/log"]);
    return false;
  }




}
