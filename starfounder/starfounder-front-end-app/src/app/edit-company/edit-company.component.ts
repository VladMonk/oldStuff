import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, ParamMap} from '@angular/router';
import { AuthService } from "../auth.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { CheckRegDataService } from "../check-reg-data.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.css']
})
export class EditCompanyComponent implements OnInit {

  link: String;

  link1: String;

  projectvalue: String;
  projectname: String;
  projectdescription: String;
  pageUserId: String;
  pageProjectId: String;
  change: Boolean;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private checkRegData: CheckRegDataService,
    private flashMessage: FlashMessagesService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.pageUserId = params.get("userid");
      this.pageProjectId = params.get("projectid");
      this.link = "http://localhost:3000/project/" + this.pageUserId + "/" + this.pageProjectId + "/editload";
      const loadrequest = {
        pageUserId: this.pageUserId,
        pageProjectId: this.pageProjectId,
        change: false
      }

      this.authService.postUser(loadrequest, this.link).subscribe(data => {
        if(data.success){
          this.projectname = data.loadData.loadProjectName;
          this.projectdescription = data.loadData.loadDesc;
          this.projectvalue = data.loadData.loadValue;
        } else {
          this.router.navigate(["**"]);
        }
      });
    });
  }

  submitProjectChange(){
    const project = {
      pageUserId: this.pageUserId,
      pageProjectId: this.pageProjectId,
      projectname: this.projectname,
      projectdescription: this.projectdescription,
      projectvalue: this.projectvalue
    }
    console.log(project);
    this.link1 = "http://localhost:3000/project/" + this.pageUserId + "/" + this.pageProjectId + "/edit";
    this.authService.postUser(project, this.link1).subscribe(data => {
      if(data.success){
        this.router.navigate(["/project/" + this.pageUserId + "/" + this.pageProjectId]);
      } else {
        console.log("false");

        this.flashMessage.show("Proizowla huinya", {
          cssClass: "alert-danger",
          time: 3000
        });
      }
    });
  }
}
