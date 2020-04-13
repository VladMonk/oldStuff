import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { map } from "rxjs/operators";
import { tokenNotExpired } from "angular2-jwt";


//import {HttpClient, HttpHeaders} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: any;
  user: any;

  constructor(
    private http: Http
    //private http: HttpClient
  ){ }

  postUser(user, link){
    let headers = new Headers();
    headers.append("Content-type", "application/json");
    return this.http.post(
      link,
      user,
      {headers: headers}).pipe(map((response: any) => response.json())
    );
  }

  // postClient(user, link){
  //   let headers = new HttpHeaders().set("Content-type", "application/json");
  //   return this.http.post(
  //     link,
  //     user,
  //     {headers: headers}
  //   );
  // }


  storeUser(token, user){
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    this.token = token;
    this.user = user;
  }

  logout(){
    this.token = null;
    this.user = null;
    localStorage.clear();
  }

  isLogged(){
    return tokenNotExpired();
  }
}
