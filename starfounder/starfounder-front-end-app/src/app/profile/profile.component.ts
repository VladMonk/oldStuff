import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap} from '@angular/router';
import { AuthService } from "../auth.service";
import { FlashMessagesService } from "angular2-flash-messages";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUserId:string;
  pageUserId:string;
  pageUserDesc: string;
  pageFirstName:string;
  pageLastName:string;
  pageUserPhoto:string;
  userProjects: Array<Object>;
  userDonates: Array<Object>;
  isAdmin: Boolean;
  pageIsAdmin: Boolean;
  adValue: Boolean;
  mark: Boolean;
  a: String;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private flashMessage: FlashMessagesService) {}

  ngOnInit() {
    if(this.authService.isLogged()){
      this.currentUserId = JSON.parse(localStorage.getItem("user")).id;
    }

    this.route.paramMap.subscribe((params: ParamMap) => {

      this.pageUserId = params.get("userid");

      const link = "http://localhost:3000/account/" + this.pageUserId;

      const pageUser = {
        pageUserId: this.pageUserId,
        currentUserId: this.currentUserId
      };
      this.authService.postUser(pageUser, link).subscribe(data => {
        if(!data.success){
          this.router.navigate(["**"]);
          console.log("false");
        } else {
          this.pageFirstName = data.pageUser.pageFirstName;
          this.pageLastName = data.pageUser.pageLastName;
          this.pageUserPhoto = data.pageUser.pageUserPhoto;
          this.userProjects = data.pageUser.pageUserProjects;
          this.userDonates = data.pageUser.pageUserDonates;
          this.isAdmin = data.pageUser.currentUserIsAdmin;
          this.pageUserDesc = data.pageUser.pageUserDesc;
          this.pageIsAdmin = data.pageUser.pageUserIsAdmin;
        }
      });
    });
  }

  handleClick(event: Event){
    console.log((event.toElement as HTMLElement).innerText);


    if(event.toElement.innerText == "Undo admin"){
      this.mark = false;
    }
    if(event.toElement.innerText == "Make admin"){
      this.mark = true;
    }

    const id = {
      pageUserId: this.pageUserId,
      adValue: this.mark
    }
    const adlink = "http://localhost:3000/account/" + this.pageUserId + "/adminned";
    this.authService.postUser(id, adlink).subscribe(data => {
      if(data.success){
        this.flashMessage.show("Successfully adminned", {
          cssClass: "alert-success",
          time: 3000
        });
      } else {
        this.flashMessage.show("Proizowla huinya", {
          cssClass: "alert-danger",
          time: 3000
        });
      }
    });
  }

  makeAdmin(){

    // const id = {
    //   pageUserId: this.pageUserId,
    //   adValue: mark
    // }
    // const adlink = "http://localhost:3000/account/" + this.pageUserId + "/adminned";
    // this.authService.postUser(id, adlink).subscribe(data => {
    //   if(data.success){
    //     this.flashMessage.show("Proizowla huinya", {
    //       cssClass: "alert-success",
    //       time: 3000
    //     });
    //   } else {
    //     this.flashMessage.show("Proizowla huinya", {
    //       cssClass: "alert-danger",
    //       time: 3000
    //     });
    //   }
    // });
  }

}
