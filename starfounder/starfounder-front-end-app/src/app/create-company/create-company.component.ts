import { Component, OnInit } from '@angular/core';
import { AuthService } from "../auth.service";
import { ActivatedRoute, Router, ParamMap} from '@angular/router';
import { FlashMessagesService } from "angular2-flash-messages";
import { CheckRegDataService } from "../check-reg-data.service";

@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.css']
})
export class CreateCompanyComponent implements OnInit {


  link: String;
  projectvalue: String;
  projectname: String;
  projectdescription: String;
  pageUserId: String;
  change: Boolean;


  constructor(
    private route: ActivatedRoute,
    private checkRegData: CheckRegDataService,
    private flashMessage: FlashMessagesService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.pageUserId = params.get("userid");
      this.link = "http://localhost:3000/project/" + this.pageUserId + "/new";
      const loadrequest = {
        pageUserId: this.pageUserId,
        change: false
      }

      this.authService.postUser(loadrequest, this.link).subscribe(data => {
        console.log(data, "loadrequest");
        if(!data.success){this.router.navigate(["**"]);}
      });

    });
  }

  submitProjectData(){

    const project = {
      pageUserId: this.pageUserId,
      projectname: this.projectname,
      projectdescription: this.projectdescription,
      projectvalue: this.projectvalue,
      change: true
    };
    console.log(typeof project.projectvalue);

    //в один метод брооооо
    if(!this.checkRegData.checkField(project.projectname)){
      this.flashMessage.show("Please, input project name", {
        cssClass: "alert-danger",
        time: 3000
      });
      return false;
    }
    if(!this.checkRegData.checkField(project.projectdescription)){
      this.flashMessage.show("Please, input description", {
        cssClass: "alert-danger",
        time: 3000
      });
      return false;
    }
    if(!this.checkRegData.checkField(project.projectvalue)){
      this.flashMessage.show("Please, input required summ of cash", {
        cssClass: "alert-danger",
        time: 3000
      });
      return false;
    }
    /////////////////////////////////////////////////////

    this.authService.postUser(project, this.link).subscribe(data => {
      if(!data.success){
        this.flashMessage.show(data.msg, {
          cssClass: "alert-danger",
          time: 3000
        });
        this.router.navigate(["project/" + this.pageUserId + "/new"]);
      } else {
        this.router.navigate(["project/" + this.pageUserId + "/" + data.projectid]);
      }
    });
  }
}
