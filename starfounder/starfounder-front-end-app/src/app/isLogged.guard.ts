import { Injectable } from '@angular/core';
import { Router, CanActivate } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable()

export class IsLoggedIn implements CanActivate {
  constructor(
    private  authService: AuthService,
    private router: Router
  ){}
  canActivate(){
    if(!this.authService.isLogged()){return true;}
    else{
      this.router.navigate(["home"]);
      return false;
    }
  }  
}
