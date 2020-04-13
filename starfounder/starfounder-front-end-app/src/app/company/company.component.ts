import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap} from '@angular/router';
import { AuthService } from "../auth.service";
import { FlashMessagesService } from "angular2-flash-messages";

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  markdown: string;
  header: string;
  pageUserId: string;
  currentUserId: string;
  projectId: string;
  link: string;
  link1: string;
  donatevalue: string;
  prjctPhoto: string;

  constructor(
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService,
    private router: Router,
    private authService: AuthService
  ) {
    if(authService.isLogged()){
      this.currentUserId = JSON.parse(localStorage.getItem("user")).id;
    }
   }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.pageUserId = params.get("userid");
      this.projectId = params.get("projectid");
      this.link = "http://localhost:3000/project/" + this.pageUserId + "/" + this.projectId;
    });
    const loadrequest = {
      pageUserId: this.pageUserId,
      projectId: this.projectId
    };
    this.authService.postUser(loadrequest, this.link).subscribe(data => {
      if(data.success){
        this.markdown = data.project.projectdescription;
        this.header = data.project.projectname;
        this.prjctPhoto = data.project.projectphoto;
      } else {
        this.router.navigate(["**"]);
      }
    });
  }

  submitDonate(){
    this.link1 = "http://localhost:3000/project/" + this.projectId + "/donate";
    const donaterequest = {
      currentUserId: this.currentUserId,
      donatevalue: this.donatevalue,
      projectId: this.projectId
    };
    this.authService.postUser(donaterequest, this.link1).subscribe(data => {
      if(data.success){
        this.flashMessage.show("Successfully donated: " + this.donatevalue, {
          cssClass: "alert-success",
          time: 3000
        });
        return false;
      } else {
        this.flashMessage.show("Donate aborted", {
          cssClass: "alert-warning",
          time: 3000
        });
        return false;
      }
    });
  }

}
