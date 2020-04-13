import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, ParamMap} from '@angular/router';
import { AuthService } from "../auth.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { CheckRegDataService } from "../check-reg-data.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  description: String;
  pageUserId: String;
  firstname: String;
  lastname: String;
  change: Boolean;
  link: String;
  image;

  @ViewChild('fileInput', {static: false}) fileInput: ElementRef;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private checkRegData: CheckRegDataService,
    private flashMessage: FlashMessagesService){}

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.pageUserId = params.get("userid");
      this.link = "http://localhost:3000/account/" + this.pageUserId + "/edit";
      const loadrequest = {
        pageUserId: this.pageUserId,
        change: false
      }

      this.authService.postUser(loadrequest, this.link).subscribe(data => {
        if(data.success){
          this.firstname = data.loadData.loadfirstname;
          this.lastname = data.loadData.loadlastname;
          this.description = data.loadData.loaddescription;
        } else {
          this.router.navigate(["**"]);
        }
      });
    });
  }

  uploadPic(){
    const upLink = "http://localhost:3000/account/" + this.pageUserId + "/file";
    const imageBlob = this.fileInput.nativeElement.files[0];
    const file = new FormData();
    file.set('file', imageBlob);
    this.http.post(upLink, file).subscribe(data => {
      console.log(data);
    })
  }

  submitChangeData(){
    const user = {
      pageUserId: this.pageUserId,
      firstname: this.firstname,
      lastname: this.lastname,
      description: this.description,
      change: true
    }

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

    this.authService.postUser(user, this.link).subscribe(data => {
      if(data.success){
        this.router.navigate(["/account/" + this.pageUserId]);
      } else {
        this.flashMessage.show("Proizowla huinya", {
          cssClass: "alert-danger",
          time: 3000
        });
      }
    });
  }
}
