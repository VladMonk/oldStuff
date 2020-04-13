import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap} from '@angular/router';
import { AuthService } from "../auth.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  projects: Array<Object>;
  currentUserId: String;
  isAdmin: Boolean;
  curUser: Object;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
    if(this.authService.isLogged()){
      this.currentUserId = JSON.parse(localStorage.getItem("user")).id;
    }

    const link = "http://localhost:3000/project/all";

    const user = {
      currentUserId: this.currentUserId
    };

    this.authService.postUser(user, link).subscribe(data => {
      if(!data.success){
        console.log("false");
      } else {
        this.projects = data.resData.projectsArray;
        //this.isAdmin = data.resData.isAdmin;
        this.curUser = {
          isAdmin: data.resData.isAdmin,
          currentUserId: this.currentUserId
        };
        console.log(this.curUser);
      }
    });
  }

}
